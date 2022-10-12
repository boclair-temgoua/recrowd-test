/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { DeleteInvestmentMutation, OneInvestmentResponse } from '../core/_models';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';



type Props = {
  investmentItem?: OneInvestmentResponse;
}

const InvestmentTableList: React.FC<Props> = ({ investmentItem }) => {
  const router = useRouter();

  const actionDeleteInvestmentMutation = DeleteInvestmentMutation({ onSuccess: () => { } });

  const deleteItem = async (investmentItem: any) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to perform this action?',
      confirmButtonText: 'Yes, Deleted',
      cancelButtonText: 'No, Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-default',
      },
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        const payloadSave = { investment_uuid: investmentItem?.uuid }
        actionDeleteInvestmentMutation.mutateAsync(payloadSave)

      }
    });

  }

  return (
    <>
      <tr key={investmentItem?.id}>
        <th>{investmentItem?.title}</th>
        <td><strong>{investmentItem?.timeInvested} MESI</strong></td>
        <td> <button type="button" className={`btn btn-sm btn-${investmentItem?.status ? 'success' : 'danger'}`}>{investmentItem?.status ? 'Active' : 'Unactivate'}</button></td>
        <td> <button type="button" className={`btn btn-sm btn-${investmentItem?.isExpiredAt ? 'danger' : 'success'}`}>{investmentItem?.isExpiredAt ? 'Expired' : 'Valid'}</button></td>
        <td>{(investmentItem?.amount)?.toFixed(2)} {investmentItem?.currency}</td>
        <td>
          <button onClick={() => router.push({ pathname: `/investments/${investmentItem?.uuid}/edit` })}  type="button" className="btn btn-sm btn-primary m-2">Edit</button>
          <button type="button" onClick={() => { deleteItem(investmentItem) }} className="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    </>

  )
}

export { InvestmentTableList }
