import { useAtom, Provider } from 'jotai'
import { priceAtom, processingAtom } from '../../_Atoms'
import { sectionId } from './_SectionStore'


export default function Price() {
  const [price] = useAtom(priceAtom)
  const [isProcessing] = useAtom(processingAtom)
  return (
    <Provider>
      <div className={`no-js-hidden ${isProcessing ? 'opacity-20 transition-opacity' : '' }`} id={`price-${sectionId}`} role="status">
        <div class={`price ${price.price_class} ${price.available ? '' : 'price--sold-out'} ${price.compare_at_price > price.price ? 'price--on-sale' : ''} ${price.price_varies === false && price.compare_at_price_varies ? 'price--no-compare' : ''} ${price.show_badges ? 'price--show-badge' : ''}`}>
          <div className="price__container">
            <div className="price__regular">
              <span className="visually-hidden visually-hidden--inline">{price.regular_price}</span>
              <span className="price-item price-item--regular">{ (price.price / 100).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) }</span>
              { ( price.taxes_included || price.has_shipping_policy_body ) && (
                <span className="product__tax caption rte pl-1">
                  {price.taxes_included ? '(税込)' : ''}
                  {price.has_shipping_policy_body ? price.shipping_policy_html : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  )
}