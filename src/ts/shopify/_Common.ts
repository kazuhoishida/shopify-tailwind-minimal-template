/*
 * Shopify Common JS
 *
 */
// @ts-expect-error TS(2339): Property 'Shopify' does not exist on type 'Window ... Remove this comment to see the full error message
if (typeof window.Shopify == "undefined") {
  // @ts-expect-error TS(2339): Property 'Shopify' does not exist on type 'Window ... Remove this comment to see the full error message
  window.Shopify = {}
}

// @ts-expect-error TS(2304): Cannot find name 'Shopify'.
Shopify.bind = function (fn: any, scope: any) {
  return function () {
    return fn.apply(scope, arguments)
  }
}

// @ts-expect-error TS(2304): Cannot find name 'Shopify'.
Shopify.setSelectorByValue = function (selector: any, value: any) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i]
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i
      return i
    }
  }
}

// @ts-expect-error TS(2304): Cannot find name 'Shopify'.
Shopify.addListener = function (target: any, eventName: any, callback: any) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent("on" + eventName, callback)
}

// @ts-expect-error TS(2304): Cannot find name 'Shopify'.
Shopify.postLink = function (path: any, options: any) {
  options = options || {}
  var method = options["method"] || "post"
  var params = options["parameters"] || {}

  var form = document.createElement("form")
  form.setAttribute("method", method)
  form.setAttribute("action", path)

  for (var key in params) {
    var hiddenField = document.createElement("input")
    hiddenField.setAttribute("type", "hidden")
    hiddenField.setAttribute("name", key)
    hiddenField.setAttribute("value", params[key])
    form.appendChild(hiddenField)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

// @ts-expect-error TS(2304): Cannot find name 'Shopify'.
Shopify.CountryProvinceSelector = function (country_domid: any, province_domid: any, options: any) {
  this.countryEl = document.getElementById(country_domid)
  this.provinceEl = document.getElementById(province_domid)
  this.provinceContainer = document.getElementById(options["hideElement"] || province_domid)

  // @ts-expect-error TS(2304): Cannot find name 'Shopify'.
  Shopify.addListener(this.countryEl, "change", Shopify.bind(this.countryHandler, this))

  this.initCountry()
  this.initProvince()
}

// @ts-expect-error TS(2304): Cannot find name 'Shopify'.
Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    var value = this.countryEl.getAttribute("data-default")
    // @ts-expect-error TS(2304): Cannot find name 'Shopify'.
    Shopify.setSelectorByValue(this.countryEl, value)
    this.countryHandler()
  },

  initProvince: function () {
    var value = this.provinceEl.getAttribute("data-default")
    if (value && this.provinceEl.options.length > 0) {
      // @ts-expect-error TS(2304): Cannot find name 'Shopify'.
      Shopify.setSelectorByValue(this.provinceEl, value)
    }
  },

  countryHandler: function (e: any) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex]
    var raw = opt.getAttribute("data-provinces")
    var provinces = JSON.parse(raw)

    this.clearOptions(this.provinceEl)
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = "none"
    } else {
      for (var i = 0; i < provinces.length; i++) {
        // @ts-expect-error TS(2403): Subsequent variable declarations must have the sam... Remove this comment to see the full error message
        var opt = document.createElement("option")
        opt.value = provinces[i][0]
        opt.innerHTML = provinces[i][1]
        this.provinceEl.appendChild(opt)
      }

      this.provinceContainer.style.display = ""
    }
  },

  clearOptions: function (selector: any) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild)
    }
  },

  setOptions: function (selector: any, values: any) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement("option")
      opt.value = values[i]
      opt.innerHTML = values[i]
      selector.appendChild(opt)
    }
  },
}
function getFocusableElements(container: any) {
  return Array.from(container.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"))
}
window.getFocusableElements = getFocusableElements

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute("role", "button")
  summary.setAttribute("aria-expanded", "false")

  // @ts-expect-error TS(2531): Object is possibly 'null'.
  if (summary.nextElementSibling.getAttribute("id")) {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    summary.setAttribute("aria-controls", summary.nextElementSibling.id)
  }

  summary.addEventListener("click", (event) => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    event.currentTarget.setAttribute("aria-expanded", !event.currentTarget.closest("details").hasAttribute("open"))
  })

  if (summary.closest("header-drawer")) return
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  summary.parentElement.addEventListener("keyup", onKeyUpEscape)
})

const trapFocusHandlers = {}

function trapFocus(container: any, elementToFocus = container) {
  var elements = getFocusableElements(container)
  var first = elements[0]
  var last = elements[elements.length - 1]

  removeTrapFocus()

  // @ts-expect-error TS(2339): Property 'focusin' does not exist on type '{}'.
  trapFocusHandlers.focusin = (event: any) => {
    if (event.target !== container && event.target !== last && event.target !== first) return

    // @ts-expect-error TS(2339): Property 'keydown' does not exist on type '{}'.
    document.addEventListener("keydown", trapFocusHandlers.keydown)
  }

  // @ts-expect-error TS(2339): Property 'focusout' does not exist on type '{}'.
  trapFocusHandlers.focusout = function () {
    // @ts-expect-error TS(2339): Property 'keydown' does not exist on type '{}'.
    document.removeEventListener("keydown", trapFocusHandlers.keydown)
  }

  // @ts-expect-error TS(2339): Property 'keydown' does not exist on type '{}'.
  trapFocusHandlers.keydown = function (event: any) {
    if (event.code.toUpperCase() !== "TAB") return // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault()
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      first.focus()
    }

    //  On the first focusable element and tab backward, focus the last element.
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault()
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      last.focus()
    }
  }

  // @ts-expect-error TS(2339): Property 'focusout' does not exist on type '{}'.
  document.addEventListener("focusout", trapFocusHandlers.focusout)
  // @ts-expect-error TS(2339): Property 'focusin' does not exist on type '{}'.
  document.addEventListener("focusin", trapFocusHandlers.focusin)

  elementToFocus.focus()
}
window.trapFocus = trapFocus

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible")
} catch (e) {
  focusVisiblePolyfill()
}

function focusVisiblePolyfill() {
  const navKeys = ["ARROWUP", "ARROWDOWN", "ARROWLEFT", "ARROWRIGHT", "TAB", "ENTER", "SPACE", "ESCAPE", "HOME", "END", "PAGEUP", "PAGEDOWN"]
  let currentFocusedElement: any = null
  let mouseClick: any = null

  window.addEventListener("keydown", (event) => {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false
    }
  })

  window.addEventListener("mousedown", (event) => {
    mouseClick = true
  })

  window.addEventListener(
    "focus",
    () => {
      if (currentFocusedElement) currentFocusedElement.classList.remove("focused")

      if (mouseClick) return

      currentFocusedElement = document.activeElement
      currentFocusedElement.classList.add("focused")
    },
    true
  )
}
window.focusVisiblePolyfill = focusVisiblePolyfill

function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach((video) => {
    // @ts-expect-error TS(2339): Property 'contentWindow' does not exist on type 'E... Remove this comment to see the full error message
    video.contentWindow.postMessage('{"event":"command","func":"' + "pauseVideo" + '","args":""}', "*")
  })
  document.querySelectorAll(".js-vimeo").forEach((video) => {
    // @ts-expect-error TS(2339): Property 'contentWindow' does not exist on type 'E... Remove this comment to see the full error message
    video.contentWindow.postMessage('{"method":"pause"}', "*")
  })
  document.querySelectorAll("video").forEach((video) => video.pause())
  document.querySelectorAll("product-model").forEach((model) => {
    // @ts-expect-error TS(2339): Property 'modelViewerUI' does not exist on type 'E... Remove this comment to see the full error message
    if (model.modelViewerUI) model.modelViewerUI.pause()
  })
}
window.pauseAllMedia = pauseAllMedia

function removeTrapFocus(elementToFocus = null) {
  // @ts-expect-error TS(2339): Property 'focusin' does not exist on type '{}'.
  document.removeEventListener("focusin", trapFocusHandlers.focusin)
  // @ts-expect-error TS(2339): Property 'focusout' does not exist on type '{}'.
  document.removeEventListener("focusout", trapFocusHandlers.focusout)
  // @ts-expect-error TS(2339): Property 'keydown' does not exist on type '{}'.
  document.removeEventListener("keydown", trapFocusHandlers.keydown)

  // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
  if (elementToFocus) elementToFocus.focus()
}
window.removeTrapFocus = removeTrapFocus

function onKeyUpEscape(event: any) {
  if (event.code.toUpperCase() !== "ESCAPE") return

  const openDetailsElement = event.target.closest("details[open]")
  if (!openDetailsElement) return

  const summaryElement = openDetailsElement.querySelector("summary")
  openDetailsElement.removeAttribute("open")
  summaryElement.setAttribute("aria-expanded", false)
  summaryElement.focus()
}
window.onKeyUpEscape = onKeyUpEscape

function debounce(this: any, fn: any, wait: any) {
  let t: any
  return (...args: any[]) => {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, args), wait)
  }
}
window.debounce = debounce

function fetchConfig(type = "json") {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: `application/${type}` },
  }
}
window.fetchConfig = fetchConfig
