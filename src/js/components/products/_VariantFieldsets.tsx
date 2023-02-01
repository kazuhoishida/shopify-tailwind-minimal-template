import VariantFieldset from './_VariantFieldset'
import { productUrl } from './_ProductStore'
import { sectionId } from './_SectionStore'
import { optionsWithValues } from './_VariantStore'

export default function VariantFieldsets() {
  const hasSize = optionsWithValues?.map( option => option.name ).filter( name => name === 'Size' ).includes('Size')
  return (
    <div className="no-js-hidden py-14" data-section={sectionId} data-url={productUrl}>
      {(() => {
        if ( !hasSize ) {
          return (
            <fieldset className={`js product-form__input flex content-center items-center Size`}>
              <div className="w-[4em]">
                <legend className="form__label contents">Size: </legend>
              </div>
              Free
            </fieldset>
          )
        }
      })()}
      {optionsWithValues?.map( option => (
        <VariantFieldset option={option} sectionId={sectionId}/>
      ))}
    </div>
  )
}
