import Taro, {Component} from '@tarojs/taro'
import {View, Text, Input} from '@tarojs/components'
import './index.scss'
import PropTypes from "prop-types";

class Index extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className="mt_location">
        <View className="location_left">
          <Text className="location_city">{this.props.city}</Text>
          <Text className="iconfont2 icon-xiangxia"/>
        </View>
        <View className="location_right">
          <Text className="iconfont2 icon-sousuo"/>
          <Input className="location_inp" type="text"/>
        </View>
      </View>
    )
  }

}

// // 对接收到的属性做了类型的约束
// Index.PropTypes = {
//   name: PropTypes.string,
//   height: PropTypes.number,
//   isMale: PropTypes.bool
// }


export default Index
