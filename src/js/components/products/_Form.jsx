import { useState, useRef } from "preact/hooks"
import { variantAtom, processingAtom } from "../../_Atoms"
import { useAtom } from "jotai"

const Form = () => {
  const formRef = useRef(null)
  const spinnerRef = useRef(null)
  const [errMsg, setErrorMessage] = useState("")
  const [isLoading, setLoadingState] = useState(false)
  const cartNotification = document.querySelector("cart-notification")
  const [variant] = useAtom(variantAtom)
  const [isProcessing] = useAtom(processingAtom)

  function onSubmitHandler(evt) {
    evt.preventDefault()
    if (isLoading) return

    handleErrorMessage()
    cartNotification.setActiveElement(document.activeElement)

    setLoadingState(true)

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: `application/javascript` },
    }
    config.headers["X-Requested-With"] = "XMLHttpRequest"
    delete config.headers["Content-Type"]

    const formData = new FormData(formRef.current)
    formData.append(
      "sections",
      cartNotification.getSectionsToRender().map((section) => section.id)
    )
    formData.append("sections_url", window.location.pathname)
    config.body = formData

    fetch(`${routes.cart_add_url}`, config)
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          handleErrorMessage(response.description)
          return
        }
        cartNotification.renderContents(response)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setLoadingState(false)
      })
  }

  function handleErrorMessage(errorMessage = false) {
    if (errorMessage) {
      setErrorMessage(errorMessage)
    }
  }
  return (
    <div className={`product-form ${isProcessing ? "opacity-20 transition-opacity" : ""}`}>
      <div className="product-form__error-message-wrapper" role="alert" hidden={errMsg === ""}>
        <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-error" viewBox="0 0 13 13">
          <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
          <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
          <path
            d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
            fill="white"
          ></path>
          <path
            d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
            fill="white"
            stroke="#EB001B"
            stroke-width="0.7"
          ></path>
        </svg>
        <span className="product-form__error-message">{errMsg}</span>
      </div>
      <form method="post" action="/cart/add" accept-charset="UTF-8" className="form" enctype="multipart/form-data" novalidate="novalidate" data-type="add-to-cart-form" onSubmit={onSubmitHandler} ref={formRef}>
        <input type="hidden" name="form_type" value="product" />
        <input type="hidden" name="utf8" value="✓" />
        <input type="hidden" name="id" value={variant.id} />
        <div className="product-form__buttons">
          <button type="submit" name="add" className={`${isLoading ? "loading" : ""} bg-accent1 text-white product-form__submit button button--full-width button--primary`} aria-disabled={isLoading} disabled={!variant.available}>
            <span>{variant.available ? "ADD TO CART" : "SOLD OUT"}</span>
            <div className={`loading-overlay__spinner ${isLoading ? "" : "hidden"}`} ref={spinnerRef}>
              <svg aria-hidden="true" focusable="false" role="presentation" className="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
              </svg>
            </div>
          </button>
          <div class={`cart__dynamic-checkout-buttons additional-checkout-buttons ${variant.available ? "" : "hidden"}`}>
            <div className="dynamic-checkout__content" id="dynamic-checkout-cart" data-shopify="dynamic-checkout-cart"></div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Form
