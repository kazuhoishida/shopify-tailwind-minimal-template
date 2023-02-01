// @ts-expect-error TS(6142): Module './_VariantFieldset' was resolved to '/User... Remove this comment to see the full error message
import VariantFieldset from './_VariantFieldset'
import { productUrl } from './_ProductStore'
import { sectionId } from './_SectionStore'
import { optionsWithValues } from './_VariantStore'

export default function VariantFieldsets() {
  const hasSize = optionsWithValues?.map( (option: any) => option.name ).filter( (name: any) => name === 'Size' ).includes('Size')
  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="no-js-hidden py-14" data-section={sectionId} data-url={productUrl}>
      {(() => {
        if ( !hasSize ) {
          return (
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <fieldset className={`js product-form__input flex content-center items-center Size`}>
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <div className="w-[4em]">
                // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                <legend className="form__label contents">Size: </legend>
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              </div>
              Free
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            </fieldset>
          )
        }
      })()}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {optionsWithValues?.map( (option: any) => <VariantFieldset option={option} sectionId={sectionId}/>)}
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  );
}
