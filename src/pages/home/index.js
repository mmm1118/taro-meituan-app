import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Navigator} from '@tarojs/components'
import './index.scss'
import QQMapWX from '../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.min'
import {swiperUrl, entryUrl, adUrl, pingtuanUrl, likeUrl} from '../../api/api'

import MtLocation from '../../components/MtLocation/index'
import MtSwiper from '../../components/MtSwiper/Index'
import MtNav from '../../components/MtNav/Index'
import MtAd from '../../components/MtAd/Index'
import MtGroup from '../../components/MtGroup/Index'
import MtShop from '../../components/MtShop/Index'

import jiangli from "../../imgs/jiangli.png";

var demo = new QQMapWX({
  key: 'FQLBZ-474AU-DGTVG-2DOZU-STEE3-JQFL4' // 必填
});
export default class Index extends Component {

  config = {
    navigationBarTitleText: '美团'
  }

  constructor() {
    super()
    this.state = {
      city: '',
      swiperArr: [],
      navs: [],
      groupArr: [],
      adArr: [],
      shopArr: []
    }
  }

  componentDidMount() {
    this._getLocation()
    this._getSwiperArr()
    this._getNavs()
    this._getGrout()
    this._getadUrl()
    // this._getshopArr()
  }

  //adArr
  async _getshopArr() {
    let shopArr = (await Taro.request({url: likeUrl})).data.data;
    // console.log(shopArr)
    // this.setState({shopArr})
    return shopArr
  }

  //adArr
  async _getadUrl() {
    let adArr = (await Taro.request({url: adUrl})).data.data;
    this.setState({adArr})
  }

  //navs
  async _getGrout() {
    let groupArr = (await Taro.request({url: pingtuanUrl})).data.data;
    this.setState({groupArr})
  }

  //navs
  async _getNavs() {
    let navs = (await Taro.request({url: entryUrl})).data.data;
    // console.log(navs)
    this.setState({navs})
  }

  //获取swiper
  async _getSwiperArr() {
    let swiperArr = (await Taro.request({url: swiperUrl})).data.data;
    this.setState({swiperArr})
  }

  //获取用户地理位置
  async _getLocation() {
    let point = await Taro.getLocation({})
    let {latitude, longitude} = point
    const city = (await this.reverseGeocoder({latitude, longitude})).result.ad_info
      .city
    this.setState({city})

    let shopArr =await this._getshopArr()
    let shopDis = shopArr.map((v, i) => {
      return {
        latitude: v.distance.lat,
        longitude: v.distance.lng,
      }
    })

    const disObj = {
      from: {latitude,longitude},
      to:shopDis
    }
    console.log(disObj)

    // 发送请求去计算距离
    let disArr = (await this.calculateDistance(disObj)).result.elements;
    console.log(disArr)
    let newShopArr=shopArr.map((v,i)=>{
      v.dis=disArr[i].distance;
      return v;
    });

    this.setState({
      shopArr:newShopArr
    })
  }

  //计算目标位置到当前位置的距离
  calculateDistance(obj) {
    return new Promise((r, j) => {
      demo.calculateDistance({
        from: obj.from,
        to: obj.to,
        success: function (res) {
          r(res);
        },
        fail: function (res) {
          j(res);
        }
      });
    })
  }

//获取地理位置中文
  reverseGeocoder(obj) {
    return new Promise((r, j) => {
      demo.reverseGeocoder({
        location: {
          latitude: obj.latitude,
          longitude: obj.longitude
        },
        success: function (res) {
          r(res);
        },
        fail: function (res) {
          j(res);
        }
      });
    })
  }

  render() {
    return (
      <View className='index'>
        <MtLocation city={this.state.city}/>
        <MtSwiper swiper_arr={this.state.swiperArr}/>
        <MtNav navs={this.state.navs}/>
        <Navigator> <Image mode="widthFix" style="width:100%;" src={jiangli}></Image> </Navigator>
        <MtGroup groupArr={this.state.groupArr}/>
        <MtAd adArr={this.state.adArr}/>
        <MtShop shopArr={this.state.shopArr}/>
      </View>
    )
  }
}
