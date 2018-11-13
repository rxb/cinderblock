import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import Helmet from 'react-helmet'

import './index.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="rgb.work"
      meta={[
        { name: 'description', content: 'Richard Boenigk: design + hacking' },
        { name: 'keywords', content: '' },
      ]}
    />

    <div>
      {children()}
    </div>

  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
