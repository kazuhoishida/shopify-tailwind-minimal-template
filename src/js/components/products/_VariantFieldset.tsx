import { useState } from 'preact/hooks'
import { checkedOptionsAtom } from '../../_Atoms'
import { useAtomValue } from 'jotai/utils'
// @ts-expect-error TS(6142): Module './_VariantOption' was resolved to '/Users/... Remove this comment to see the full error message
import VariantOption from './_VariantOption'

export default function VariantFieldset({
  option
}: any) {
  const checked = useAtomValue(checkedOptionsAtom)
  const [color, setColorName] = useState(checked['Color'])
  const changeColor = function(name: any) {
    setColorName(name)
  }
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <fieldset className={`js product-form__input flex content-center ${ option.name === 'Color' && '!m-0' } ${option.name}`}>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className="w-[4em] shrink-0">
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <legend className="form__label contents">{option.name}: </legend>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className="flex flex-col gap-y-1">
        { option.name === 'Color' && (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div>{color}</div>
        )}
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className="flex flex-wrap">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          {option.values.map( (value: any, index: any)  => <VariantOption {...{option, value, index, changeColor}} /> )}
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </fieldset>
  </>;
}
