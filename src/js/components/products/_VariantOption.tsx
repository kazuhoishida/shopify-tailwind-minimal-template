import { useRef, useEffect } from 'preact/hooks'
import { useAtom, Provider } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { productUrl } from './_ProductStore'
import { priceAtom, variantAtom, checkedOptionsAtom, checkedOptionsRWAtom, processingAtom } from '../../_Atoms'
// @ts-expect-error TS(6142): Module './_PriceStore' was resolved to '/Users/Kaz... Remove this comment to see the full error message
import { priceJsonId } from './_PriceStore'
import { productVariants } from './_VariantStore'
import { sectionId } from './_SectionStore'

export default function VariantOption({
  option,
  value,
  index,
  changeColor
}: any) {
  const input = useRef()
  const [variant, setVariant] = useAtom(variantAtom)
  const checked = useAtomValue(checkedOptionsAtom)
  const checkOption = useUpdateAtom(checkedOptionsRWAtom)
  const setPrice = useUpdateAtom(priceAtom)
  const setProcessing = useUpdateAtom(processingAtom)

  function toggleAddButton(disable = true, text: any, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${sectionId}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
  
    if (!addButton) return;
  
    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      addButtonText.textContent = window.variantStrings.addToCart;
    }
  
    if (!modifyClass) return;
  }
  
  function updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;
  
    // @ts-expect-error TS(2339): Property 'fetchAvailability' does not exist on typ... Remove this comment to see the full error message
    if (variant && variant.available && pickUpAvailability?.fetchAvailability) {
      // @ts-expect-error TS(2339): Property 'fetchAvailability' does not exist on typ... Remove this comment to see the full error message
      pickUpAvailability?.fetchAvailability(variant.id);
    } else {
      pickUpAvailability?.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }
  
  function removeErrorMessage() {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
    // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }
  
  function updateURL() {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (!variant || input.current.updateUrl === 'false') return
    window.history.replaceState({ }, '', `${productUrl}?variant=${variant.id}`)
  }
  
  function updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${sectionId}`)
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]')
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      input.value = variant.id
      // @ts-expect-error TS(2531): Object is possibly 'null'.
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
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const newPrice = JSON.parse(source.text)
        if ( newPrice ) {
          setPrice(newPrice)
        }
        // @ts-expect-error TS(2339): Property 'variantStrings' does not exist on type '... Remove this comment to see the full error message
        toggleAddButton(!variant.available, window.variantStrings.soldOut)
      // @ts-expect-error TS(2550): Property 'finally' does not exist on type 'Promise... Remove this comment to see the full error message
      }).finally( () => setProcessing( false ) )
  }
  
  function updateShareUrl() {
    const shareButton = document.getElementById(`Share-${sectionId}`)
    if (!shareButton) return
    // @ts-expect-error TS(2339): Property 'updateUrl' does not exist on type 'HTMLE... Remove this comment to see the full error message
    shareButton.updateUrl(`${window.shopUrl}${productUrl}?variant=${variant.id}`)
  }
  const onChange = (e: any) => {
    checkOption(input.current)
    const currentVariant = productVariants.find(({
      options
    // @ts-expect-error TS(2550): Property 'values' does not exist on type 'ObjectCo... Remove this comment to see the full error message
    }: any) => !options.map((option: any) => Object.values(checked).includes(option)).includes(false))
    if(!currentVariant) {
      return
    }
    setVariant(currentVariant)
  }
  /**
   * デフォルトのチェック状態を初期化
   */
  useEffect(() => {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    input.current.checked = option.selected_value == value
  }, [])
  useEffect(() => {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if( input.current.value !== checked[input.current.name] ) {
      return
    }
    toggleAddButton(true, '', false)
    updatePickupAvailability()
    removeErrorMessage()
    if (!variant) {
      toggleAddButton(true, '', true)
      // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
      setUnavailable(sectionId)
    } else {
      updateURL()
      updateVariantInput()
      renderProductInfo()
      updateShareUrl()
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    changeColor(input.current.value)
  }, [variant])
  const classNameBase = `relative border-white border-[4px] peer-checked:shadow-[0_0_1px_1px_#333333] hover:shadow-[0_0_2px_0_black] rounded-full`
  const beforeClassName = `before:content-[attr(data-text)] before:text-[length:1rem] before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2`
  const bgColor = option.name === 'Color' ? `bg-v-${value.toLowerCase()}` : ''
  const text = option.name === 'Color' ? '' : value
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Provider>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className="contents group">
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <input type="radio"
          id={`${sectionId}-${option.position}-${index}`}
          name={option.name}
          value={value}
          form={`product-form-${sectionId}`}
          ref={input}
          onChange={onChange}
          className="peer"
        />
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <label for={`${sectionId}-${option.position}-${index}`} data-text={text}
          className={`${classNameBase} ${beforeClassName} ${bgColor}`}
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        ></label>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    </Provider>
  )
}
