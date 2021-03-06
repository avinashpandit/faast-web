import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { isDefaultPortfolioEmpty } from 'Selectors/portfolio'
import { compose, setDisplayName, withPropsOnChange } from 'recompose'
import Layout from 'Components/Layout'
import * as qs from 'query-string'
import { withRouter } from 'react-router'
import { isAppBlocked } from 'Selectors'
import Link from 'Components/Link'

import Blocked from 'Components/Blocked'
import StepOne from './StepOne'
import StepTwo from './StepTwo'

const SwapWidget = ({ orderId, blocked, stepOne, isDefaultPortfolioEmpty }) => (
  <Fragment>
    <Helmet>
      <title>Instantly and Safely Trade 70+ Cryptocurrencies - Faa.st</title>
      <meta name='description' content='Trade your crypto directly from your hardware or software wallet. Swap Bitcoin, Ethereum, Litecoin, Monero, Tron, and more with near-zero fees.' /> 
    </Helmet>
    {blocked ? (
      <Blocked/>
    ) : null}
    <Layout className='pt-3 p-0 p-sm-3'>
      {!orderId
        ? (<StepOne {...stepOne}/>) 
        : (<StepTwo orderId={orderId} />)}
      {!isDefaultPortfolioEmpty && (
        <div className='text-center mt-3 font-sm'>
          <Link to='/rebalance'>Want to swap multiple coins at once? Use our rebalance tool.</Link>
        </div>
      )}
    </Layout>
  </Fragment>
)

export default compose(
  setDisplayName('SwapWidget'),
  connect(createStructuredSelector({
    blocked: isAppBlocked,
    isDefaultPortfolioEmpty,
  }),{
  }),
  withRouter,
  withPropsOnChange(['location'], ({ location }) => {
    const urlParams = qs.parse(location.search)
    let { id, from, fromAmount, fromAddress, to, toAmount, toAddress } = urlParams
    fromAmount = fromAmount && parseFloat(fromAmount)
    toAmount = toAmount && parseFloat(toAmount)
    return {
      orderId: id,
      stepOne: {
        sendSymbol: from,
        receiveSymbol: to,
        defaultSendAmount: fromAmount,
        defaultReceiveAmount: toAmount,
        defaultRefundAddress: fromAddress,
        defaultReceiveAddress: toAddress,
      },
    }
  })
)(SwapWidget)
