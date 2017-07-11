import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Switch, Input, Checkbox } from 'antd'
const Search = Input.Search;
window.queryParms={/*缓存查询的参数*/
	  	keyword:''
};
const UserFilter = ({
  onSearch,
  onOnlyNewApply,
}) => {
	  function onsearch(value){
	  	debugger;
	  	window.queryParms.keyword=value;
	  	onSearch(window.queryParms);
	  }
  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
      <Search
	    placeholder="搜索姓名、邮箱、手机、公司名称"
	    style={{ width: 300 ,borderRadius: 25}}
	    onSearch={value => {onsearch(value)}}
	  />
      </Col>
      <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginTop: 10, textAlign: 'right' }}>
      </Col>
    </Row>
  )
}

UserFilter.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onOnlyNewApply: PropTypes.func,
}

export default Form.create()(UserFilter)
