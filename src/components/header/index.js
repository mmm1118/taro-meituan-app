import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'
import PropTypes from "prop-types";

class Index extends Component {
  config = {
    navigationBarTitleText: "taro-index"
  };

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick() {
    console.log(this.props)
    this.props.onClick('Heard')
  }

  render() {
    return (
      <View className="dialog">
        <View className='headerBox' onClick={this._handleClick}>{this.props.name}</View>

        <View className="header">{this.props.renderHeader}</View>
        <View className="body">{this.props.children}</View>
        <View className="footer">{this.props.renderFooter}</View>
      </View>
    )
  }

}

// 对接收到的属性做了类型的约束
Index.PropTypes = {
  name: PropTypes.string,
  height: PropTypes.number,
  isMale: PropTypes.bool
}


export default Index
