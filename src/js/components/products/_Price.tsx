import { useAtom, Provider } from 'jotai'
import { priceAtom, processingAtom } from '../../_Atoms'
import { sectionId } from './_SectionStore'


export default function Price() {
  const [price] = useAtom(priceAtom)
  const [isProcessing] = useAtom(processingAtom)
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Provider>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={`no-js-hidden ${isProcessing ? 'opacity-20 transition-opacity' : '' }`} id={`price-${sectionId}`} role="status">
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div class={`price ${price.price_class} ${price.available ? '' : 'price--sold-out'} ${price.compare_at_price > price.price ? 'price--on-sale' : ''} ${price.price_varies === false && price.compare_at_price_varies ? 'price--no-compare' : ''} ${price.show_badges ? 'price--show-badge' : ''}`}>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div className="price__container">
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <div className="price__regular">
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <span className="visually-hidden visually-hidden--inline">{price.regular_price}</span>
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <span className="price-item price-item--regular">{ (price.price / 100).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) }</span>
              { ( price.taxes_included || price.has_shipping_policy_body ) && (
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                <span className="product__tax caption rte pl-1">
                  {price.taxes_included ? '(税込)' : ''}
                  {price.has_shipping_policy_body ? price.shipping_policy_html : ''}
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                </span>
              )}
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            </div>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    </Provider>
  )
}