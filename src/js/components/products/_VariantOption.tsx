import { useRef, useEffect } from 'preact/hooks'
import { useAtom, Provider } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { productUrl } from './_ProductStore'
import { priceAtom, variantAtom, checkedOptionsAtom, checkedOptionsRWAtom, processingAtom } from '../../_Atoms'
import { priceJsonId } from './_PriceStore'
import { productVariants } from './_VariantStore'
import { sectionId } from './_SectionStore'

export default function VariantOption({option, value, index, changeColor}) {
  const input = useRef()
  const [variant, setVariant] = useAtom(variantAtom)
  const checked = useAtomValue(checkedOptionsAtom)
  const checkOption = useUpdateAtom(checkedOptionsRWAtom)
  const setPrice = useUpdateAtom(priceAtom)
  const setProcessing = useUpdateAtom(processingAtom)

  function toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${sectionId}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
  
    if (!addButton) return;
  
    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }
  
    if (!modifyClass) return;
  }
  
  function updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;
  
    if (variant && variant.available && pickUpAvailability?.fetchAvailability) {
      pickUpAvailability?.fetchAvailability(variant.id);
    } else {
      pickUpAvailability?.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }
  
  function removeErrorMessage() {
    const section = input.current.closest('section');
    if (!section) return;
  
    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }
  
  function setUnavailable() {
    const button = document.getElementById(`product-form-${sectionId}`);
    const addButton = button?.querySelector('[name="add"]');
    const addButtonText = button?.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${sectionId}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }
  
  function updateURL() {
    if (!variant || input.current.updateUrl === 'false') return
    window.history.replaceState({ }, '', `${productUrl}?variant=${variant.id}`)
  }
  
  function updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${sectionId}`)
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]')
      input.value = variant.id
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })
  }
  
  async function renderProductInfo() {
    setProcessing( true )
    return fetch(`${productUrl}?variant=${variant.id}&section_id=${sectionId}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const source = html.getElementById(priceJsonId)
        const newPrice = JSON.parse(source.text)
        if ( newPrice ) {
          setPrice(newPrice)
        }
        toggleAddButton(!variant.available, window.variantStrings.soldOut)
      }).finally( () => setProcessing( false ) )
  }
  
  function updateShareUrl() {
    const shareButton = document.getElementById(`Share-${sectionId}`)
    if (!shareButton) return
    shareButton.updateUrl(`${window.shopUrl}${productUrl}?variant=${variant.id}`)
  }
  const onChange = (e) => {
    checkOption(input.current)
    const currentVariant = productVariants.find(({options}) => !options.map(option => Object.values(checked).includes(option)).includes(false))
    if(!currentVariant) {
      return
    }
    setVariant(currentVariant)
  }
  /**
   * デフォルトのチェック状態を初期化
   */
  useEffect(() => {
    input.current.checked = option.selected_value == value
  }, [])
  useEffect(() => {
    if( input.current.value !== checked[input.current.name] ) {
      return
    }
    toggleAddButton(true, '', false)
    updatePickupAvailability()
    removeErrorMessage()
    if (!variant) {
      toggleAddButton(true, '', true)
      setUnavailable(sectionId)
    } else {
      updateURL()
      updateVariantInput()
      renderProductInfo()
      updateShareUrl()
    }
    changeColor(input.current.value)
  }, [variant])
  const classNameBase = `relative border-white border-[4px] peer-checked:shadow-[0_0_1px_1px_#333333] hover:shadow-[0_0_2px_0_black] rounded-full`
  const beforeClassName = `before:content-[attr(data-text)] before:text-[length:1rem] before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2`
  const bgColor = option.name === 'Color' ? `bg-v-${value.toLowerCase()}` : ''
  const text = option.name === 'Color' ? '' : value
  return (
    <Provider>
      <div className="contents group">
        <input type="radio"
          id={`${sectionId}-${option.position}-${index}`}
          name={option.name}
          value={value}
          form={`product-form-${sectionId}`}
          ref={input}
          onChange={onChange}
          className="peer"
        />
        <label for={`${sectionId}-${option.position}-${index}`} data-text={text}
          className={`${classNameBase} ${beforeClassName} ${bgColor}`}
        ></label>
      </div>
    </Provider>
  )
}
