import { product } from "./_ProductStore"
import { sectionId } from "./_SectionStore"
import VariantFieldsets from "./_VariantFieldsets"
import Form from "./_Form"
import PickupAvailability from "./_PickupAvailability"
import Tag from "./_Tag"
import Accordion from "./_Accordion"
import Price from "./_Price"
import FormInstallment from "./_FormInstallment"

export default function Description() {
  return (
    <div className="col-span-5 col-span-1 p-8">
      <div id={`ProductInfo-${sectionId}`} className="product__info-container--sticky">
        <p className="">{product.vendor}</p>
        <div className="flex">
          <h1 className="product__title">
            <span className="mr-[1rem]  text-[27px] text-[20px]">{product.title}</span>
            {product.tags.includes("new") && (
              <span className="h-[1em] uppercase align-text-bottom">
                <Tag type="new" />
              </span>
            )}
          </h1>
        </div>
        <p className="product__text subtitle"></p>
        <Price />
        {product.tags.includes("restock") && (
          <span className="inline-block h-[1em] mt-6">
            <Tag type="restock" label="再入荷" />
          </span>
        )}
        <FormInstallment />
        <VariantFieldsets />
        <div>
          <Form />
          <link href="/assets/component-pickup-availability.css?v=2302742736192769326" rel="stylesheet" type="text/css" media="all" />
          <PickupAvailability />
        </div>
        <script src="/assets/pickup-availability.js?v=9534521698898523963" defer="defer"></script>
        <Accordion id="inline-json-block-product-detail" />
        <Accordion id="inline-json-block-product-dimensions" />
        <Accordion id="inline-json-block-product-quality" />
        <div className="block empty:block h-4"></div>
        <div>※返品・交換・キャンセルについて</div>
        <div>
          <p>ご注文確定後、お客様都合での返品・交換・キャンセルは承っておりません。必ず商品名・カラー・サイズ・数量をご確認の上、ご注文をお願いいたします。</p>
        </div>
      </div>
    </div>
  )
}
