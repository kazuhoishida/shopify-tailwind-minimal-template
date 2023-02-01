import { useEffect, useRef } from 'preact/hooks'
import { useAtom } from 'jotai'
import { variantAtom } from '../../_Atoms'


export default function FormInstallment() {
  const idRef = useRef(null)
  const [variant] = useAtom(variantAtom)
  useEffect(() => {
    idRef.current.value = variant?.id
  }, [variant])
  return (
    <form method="post" action="/cart/add" id="product-form-installment" accept-charset="UTF-8" class="installment caption-large" enctype="multipart/form-data">
      <input type="hidden" name="form_type" value="product" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="id" value={variant?.id} ref={idRef} />
    </form>
  )
}
