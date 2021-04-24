var storeList = {
    '艾诺迪亚数码专营': [{
        'id': 1,
        'intro': '15.6英寸便携显示器铝合金桌面',
        'price': 59.4,
        'favourable_price': 50.9,
        'count': 2,
        'openCount': false,
        'little_image': "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/u%3D3324287611%2C3832720410%26fm%3D26%26gp%3D0.jpg"

    }],
    '天地图书专营店': [{
        'id': 2,
        'intro': '全部现货[重点题视频]2021',
        'price': 41,
        'favourable_price': 39.5,
        'count': 3,
        'openCount': false,
        'little_image': "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/u%3D3324287611%2C3832720410%26fm%3D26%26gp%3D0.jpg"
    }, {
        'id': 3,
        'intro': '全部现货[送攻略+易错题]2021',
        'price': 149,
        'favourable_price': 125,
        'count': 3,
        'openCount': false,
        'little_image': "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/u%3D3324287611%2C3832720410%26fm%3D26%26gp%3D0.jpg"
    }, {
        'id': 4,
        'intro': '全部现货2022张键',
        'price': 199.9,
        'favourable_price': 189,
        'count': 1,
        'openCount': false,
        'little_image': "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/u%3D3324287611%2C3832720410%26fm%3D26%26gp%3D0.jpg"
    }]
}

var newStoreList = [{
    "pk": 3,
    "count": 5,
    "commodity": {
        "id": 32,
        "commodity_name": "磨牙棒222",
        "price": "9.90",
        "favourable_price": "8.50",
        "intro": "白色磨牙榜夹芯钙奶棒100克买二送一",
        "status": true,
        "little_image": "",
        "store": {
            "id": 1,
            "name": "云中小店铺",
            "intro": "这是云中的店铺,出售零食"
        }
    },
    "sku": {
        "id": 9,
        "sid": "19-53-38-43",
        "price": "12.00",
        "favourable_price": "9.50",
        "name": "美味黑色4GB18cm大型变态辣辣条",
        "status": true
    }
}]

var storeNameDict = {
    '艾诺迪亚数码专营': false,
    '天地图书专营店': false
}

export { storeList, storeNameDict, newStoreList }