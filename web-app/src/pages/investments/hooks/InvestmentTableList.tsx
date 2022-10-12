/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { OneInvestmentResponse } from '../core/_models';
import { useRouter } from 'next/router';



type Props = {
  investmentItem?: OneInvestmentResponse;
}

const InvestmentTableList: React.FC<Props> = ({ investmentItem }) => {
  const router = useRouter();

  return (
    <>
      <tr key={investmentItem?.id}>
        <th>{investmentItem?.title}</th>
        <td></td>
        <td></td>
        <td>
          <button onClick={() => router.push({ pathname: `/investments/${investmentItem?.uuid}/edit` })}  type="button" className="btn btn-sm btn-primary m-2">Edit</button>
          <button type="button" className="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    </>

  )
}

export { InvestmentTableList }
