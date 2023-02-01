import { useState } from 'preact/hooks'
import { checkedOptionsAtom } from '../../_Atoms'
import { useAtomValue } from 'jotai/utils'
import VariantOption from './_VariantOption'

export default function VariantFieldset({option}) {
  const checked = useAtomValue(checkedOptionsAtom)
  const [color, setColorName] = useState(checked['Color'])
  const changeColor = function(name) {
    setColorName(name)
  }
  return (
    <>
      <fieldset className={`js product-form__input flex content-center ${ option.name === 'Color' && '!m-0' } ${option.name}`}>
        <div className="w-[4em] shrink-0">
          <legend className="form__label contents">{option.name}: </legend>
        </div>
        <div className="flex flex-col gap-y-1">
          { option.name === 'Color' && (
            <div>{color}</div>
          )}
          <div className="flex flex-wrap">
            {option.values.map( (value, index)  => <VariantOption {...{option, value, index, changeColor}} /> )}
          </div>
        </div>
      </fieldset>
    </>
  )
}
