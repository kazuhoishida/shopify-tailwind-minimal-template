import { useReducer, useContext } from 'preact/hooks'
import { QuantityContext } from './_QuantityStore'

export default function QuantityInput({sectionId}) {
  const quantity = useContext(QuantityContext)
  const min = 1
  const reducer = (state, action) => {
    switch (action) {
      case 'increment': return state + 1;
      case 'decrement': {
        if ( state === min ) return state
        return state - 1
      };
      case 'reset': return 0;
      default: throw new Error('Unexpected action');
    }
  }
  const [count, dispatch] = useReducer(reducer, min)
  return (
    <div class="quantity">
      <button class="quantity__button no-js-hidden" name="minus" type="button" onClick={() => dispatch('decrement')} disabled={count === min}>
        <span class="visually-hidden">{quantity.decrease}</span>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path>
        </svg>
      </button>
      <input class="quantity__input" type="number" name="quantity" id={`Quantity-${sectionId}`} min="1" value={`${count}`} />
      <button class="quantity__button no-js-hidden" name="plus" type="button" onClick={() => dispatch('increment')}>
        <span class="visually-hidden">{quantity.increase}</span>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
  )
}
