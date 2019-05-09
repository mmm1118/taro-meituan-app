import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'
import Header from '../../components/header/index'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this._renderNum = this._renderNum.bind(this)
  }

  componentWillMount() {
    console.log(this.$router)
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  _handleGoIndex(param) {
    console.log(param)
    // Taro.navigateTo({
    //   url:'../index/index?id=index'
    // })
  }

  _handleCompon(param) {
    console.log(`这个组件名叫${param}`)
  }

  _renderNum() {
    const numbers = [...Array(50).keys()]; // [0, 1, 2, ..., 98, 99]
    const listItems = numbers.map(number => {
      return (
        <View key={number} className="li">
          我是第 {number + 1} 个数字
        </View>
      );
    });
    return listItems
  }

  render() {
    return (
      <View className='index'>
        <Header name={111111111} onClick={this._handleCompon}
                renderHeader={<View className="welcome-message">Welcome!</View>}
                renderFooter={<Button className="close">Close</Button>}
        >
          <View className="dialog-message">Thank you for using Taro.</View>
        </Header>
        <Text>mememe</Text>
        <Text className='iconfont2 icon-sousuo'></Text>
        <View className='demo' onClick={() => this._handleGoIndex('bbbb')}></View>
        {this._renderNum}
      </View>
    )
  }
}
