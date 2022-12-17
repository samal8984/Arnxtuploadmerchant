import React from 'react'
import { Helmet } from 'react-helmet'

export const Metadata = ({title}) => {
  return (
    <div>
         <Helmet>
            <title>{`${title} - Arnxt`}</title>
        </Helmet>
    </div>
  )
}
