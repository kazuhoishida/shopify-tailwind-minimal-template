import { useEffect, useRef } from 'preact/hooks'
import { useAtom } from 'jotai'
import { variantAtom } from '../../_Atoms'


export default function FormInstallment() {
  const idRef = useRef(null)
  const [variant] = useAtom(variantAtom)
  useEffect(() => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    idRef.current.value = variant?.id
  }, [variant])
  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <form method="post" action="/cart/add" id="product-form-installment" accept-charset="UTF-8" class="installment caption-large" enctype="multipart/form-data">
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <input type="hidden" name="form_type" value="product" />
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <input type="hidden" name="utf8" value="✓" />
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <input type="hidden" name="id" value={variant?.id} ref={idRef} />
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </form>
  )
}
