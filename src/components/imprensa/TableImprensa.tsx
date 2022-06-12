import React from 'react'
import { IconEdit, IconTrash, IconView } from '../icons'

interface TableProps {
  // imprensa: Imprensa[]
  imprensa: any
  selectImprensa?: any
  deleteImprensa?: any
  viewImprensa?: any
}

export function TableImprensa(props: TableProps) {
  const showActions =
    props.selectImprensa || props.deleteImprensa || props.viewImprensa

  function renderHeader() {
    return (
      <tr className=''>
        <th className='p-4 text-left'>Titúlo</th>
        <th className='p-4 text-center'>Data publicação</th>
        {showActions ? <th className='p-4 text-center'>Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return props.imprensa?.map((imprensa, i) => {
      return (
        <tr
          key={imprensa.id}
          className={`${i % 2 === 0 ? 'bg-teal-200 text-green-900' : 'bg-teal-100 text-green-900'}`}
        >
          <td className='p-4 text-left'>{imprensa.title}</td>
          <td className='p-4 text-center'>
            {Intl.DateTimeFormat('pt-PT').format(
              new Date(imprensa.datePublished)
            )}
          </td>
          {showActions ? renderActions(imprensa) : false}
        </tr>
      )
    })
  }

  function renderActions(imprensa) {
    return (
      <td>
        <div className='flex justify-center items-center'>
          {props.selectImprensa ? (
            <button
              onClick={() => props.selectImprensa?.(imprensa)}
              className={`
          flex justify-center items-center
          text-teal-900 hover:text-teal-600 p-1
      `}
            >
              {IconEdit}
            </button>
          ) : (
            false
          )}
          {props.deleteImprensa ? (
            <button
              onClick={() => props.deleteImprensa?.(imprensa)}
              className={`
            flex justify-center items-center
            text-teal-900 hover:text-red-700 p-1
        `}
            >
              {IconTrash}
            </button>
          ) : (
            false
          )}
          {props.viewImprensa ? (
            imprensa.fileUrl ? (
              <>
                <a
                  onClick={() => props.viewImprensa?.(imprensa)}
                  className={`
            flex justify-center items-center
            text-teal-900 hover:text-blue-700 p-1
        `}
                  href={`${process.env.API_SINTONIZA_T}/public/imprensa/${imprensa.fileUrl}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {IconView}
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => props.viewImprensa?.(imprensa)}
                  className={`
            flex justify-center items-center
            text-teal-900 hover:text-blue-700 p-1
        `}
                  href={`https://${imprensa.linkYoutube}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {IconView}
                </a>
              </>
            )
          ) : (
            false
          )}
        </div>
      </td>
    )
  }

  return (
    <table className='w-full rounded-xl overflow-hidden'>
      <thead
        className={`
            bg-gradient-to-r from-teal-700 to-teal-500
            text-white text-sm font-bold tracking-wider
        `}
      >
        {renderHeader()}
      </thead>
      <tbody className='bg-white'>{renderData()}</tbody>
    </table>
  )
}
