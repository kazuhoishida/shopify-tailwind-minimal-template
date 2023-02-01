import { render } from "preact"
import { useState, useEffect } from "preact/hooks"

export default function CategoryMenu() {
  useEffect(() => {
    const pathUrl = window.location.pathname
    const filter = window.location.search

    const split = pathUrl.split("/")
    //all, boka-nii or boka-nii-loo
    const currPath = split[split.length - 1]

    //product type = ex. BOTTOMS, TOPS
    //set 'all' because default is empty
    const productType = filter.substr(filter.indexOf("=") + 1).toLowerCase() || "all"

    //to set default category/vendor
    setdefaultVendor(currPath)
    //to update category menu switching

    //do not update on ranking page or new/restock collection page
    if (currPath == "all" || currPath == "boka-nii" || currPath == "boka-nii-loo") {
      setActiveMenu(currPath)
      setActiveCategory(productType)
    }
  }, [])

  const categories = JSON.parse(document.getElementById("inline-json-category").text)

  console.log(categories)

  const [defaultVendor, setdefaultVendor] = useState("all")
  const [activeMenu, setActiveMenu] = useState("all")
  const [activeCategory, setActiveCategory] = useState("all")

  const updateMenu = (e) => {
    e.preventDefault()
    const handle = e.target.dataset.handle
    setActiveMenu(handle)
  }

  return (
    <div className="flex justify-center mx-auto sm:w-page-mobile w-page-mobile">
      <div className="text-center relative w-full">
        <ul className="flex justify-center mb-8 mb-4 text-26">
          {categories.nav.map(({ url, title, id, handle }) => (
            <li className="p-2 mx-8 mx-2  whitespace-nowrap text-24 text-18" key={id}>
              <a href={url} className={(activeMenu === handle ? "activeCatList " : "") + "hover:border-b border-black hover:opacity-60 transition-all"} data-handle={handle} onClick={updateMenu}>
                {title}
              </a>
            </li>
          ))}
        </ul>
        {categories.nav.map((list) => (
          <ul className={(activeMenu === list.handle ? "active " : "") + "categoryNameUl"}>
            {list.links.map(({ url, title, id }) => (
              <li className="p-2 mx-8 sm:mx-0 mx-0 sm:text-left text-left text-16 text-13 " key={id}>
                <a href={url} className={defaultVendor === list.handle && activeCategory === title.toLowerCase() ? "border-b border-black text-base-text" : "" + "hover:text-base-text hover:border-b border-black"}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

render(<CategoryMenu />, document.getElementById("app-category-menu"))
