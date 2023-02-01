import { product } from "./_ProductStore"
import { sectionId } from "./_SectionStore"
// @ts-expect-error TS(6142): Module './_VariantFieldsets' was resolved to '/Use... Remove this comment to see the full error message
import VariantFieldsets from "./_VariantFieldsets"
// @ts-expect-error TS(6142): Module './_Form' was resolved to '/Users/KazuhoIsh... Remove this comment to see the full error message
import Form from "./_Form"
// @ts-expect-error TS(6142): Module './_PickupAvailability' was resolved to '/U... Remove this comment to see the full error message
import PickupAvailability from "./_PickupAvailability"
// @ts-expect-error TS(6142): Module './_Tag' was resolved to '/Users/KazuhoIshi... Remove this comment to see the full error message
import Tag from "./_Tag"
// @ts-expect-error TS(6142): Module './_Accordion' was resolved to '/Users/Kazu... Remove this comment to see the full error message
import Accordion from "./_Accordion"
// @ts-expect-error TS(6142): Module './_Price' was resolved to '/Users/KazuhoIs... Remove this comment to see the full error message
import Price from "./_Price"
// @ts-expect-error TS(6142): Module './_FormInstallment' was resolved to '/User... Remove this comment to see the full error message
import FormInstallment from "./_FormInstallment"

export default function Description() {
  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="col-span-5 col-span-1 p-8">
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div id={`ProductInfo-${sectionId}`} className="product__info-container--sticky">
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <p className="">{product.vendor}</p>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className="flex">
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <h1 className="product__title">
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <span className="mr-[1rem]  text-[27px] text-[20px]">{product.title}</span>
            {product.tags.includes("new") && (
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <span className="h-[1em] uppercase align-text-bottom">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Tag type="new" />
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              </span>
            )}
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </h1>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <p className="product__text subtitle"></p>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Price />
        {product.tags.includes("restock") && (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className="inline-block h-[1em] mt-6">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Tag type="restock" label="再入荷" />
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </span>
        )}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FormInstallment />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <VariantFieldsets />
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Form />
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <link href="/assets/component-pickup-availability.css?v=2302742736192769326" rel="stylesheet" type="text/css" media="all" />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <PickupAvailability />
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <script src="/assets/pickup-availability.js?v=9534521698898523963" defer="defer"></script>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Accordion id="inline-json-block-product-detail" />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Accordion id="inline-json-block-product-dimensions" />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Accordion id="inline-json-block-product-quality" />
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className="block empty:block h-4"></div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div>※返品・交換・キャンセルについて</div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <p>ご注文確定後、お客様都合での返品・交換・キャンセルは承っておりません。必ず商品名・カラー・サイズ・数量をご確認の上、ご注文をお願いいたします。</p>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  )
}
