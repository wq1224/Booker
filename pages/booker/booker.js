Page({
  data: {
    columnInfo: [], //每列的宽度
    bodyWidth: 0, // 总宽度
    datas: []
  },
  onLoad() {
    this.loadMore();
  },
  /**
   * 计算单元格与scroll-view宽度
   */
  calc_col_width() {
    this.setData({
      columnInfo: [],
      bodyWidth: 0,
    });
    let keys = Object.keys(this.data.datas[0]);
    console.log(keys)
    let { bodyWidth } = this.data;
    wx.createSelectorQuery().selectAll('#table-body > .body > .tr > .td > .content').boundingClientRect(rects => {
      let row_info = rects.slice(0, keys.length);
      let columnInfo = {};
      row_info.map((row, i) => {
        let width = this.get_str_length(keys[i]) > row.width ? this.get_str_length(keys[i]) : row.width;
        columnInfo[keys[i]] = width;
        bodyWidth += width;
        this.setData({
          columnInfo,
          bodyWidth
        });
      });
    }).exec();
  },
  /**
   * 根据内容返回单元格宽度
   * @param str 单元格数据
   */
  get_str_length(str) {
    var length = 0;
    for (let i = 0; i < str.length; i++) {
      let c = str.charAt(i);
      if (/^[\u0000-\u00ff]$/.test(c)) {
        length += 0.8;
      }
      else {
        length += 1;
      }
    }
    return length * 16
  },
  /**
   * 加载更多, 通过绑定bindscrolltolower
   */
  loadMore() {
    wx.showLoading({
      title: '加载数据...',
    });
    const { datas } = this.data;
    setTimeout(() => {
      // 模拟异步
      for (let i = 0; i <= 10; i++) {
        datas.push({
          "Toastmaster（TMD）1": "A.A"
        });
        datas.push({
          "GE": "C C"
        });
        datas.push({
          "TableTopic2": "B B"
        });
      }
      // 在此更新数据
      this.setData({ datas });
      this.calc_col_width();
      wx.hideLoading();
    }, 3000);
  }
})