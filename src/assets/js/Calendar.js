/**
 * 该 js 用于获取日历的相关数据
 * 注意：本日历的星期显示顺序为：日 一 二 三 四 五 六
 */

/**
 * showMonth:显示的月份数
 * desc：倒序显示（默认false）
 * exceedNowNotUse: 超过当前时间不可使用(默认false)
 * startWeek: 开始的星期数(默认0)[0 - 6], 默认:顺序为：日0 一1 二2 三3 四4 五5 六6
 * 
 */
function Calendar(opts = {}) {
    this._opts = opts;
    // 开始的星期数
    this._opts.startWeek || (this._opts.startWeek = 0);

    this._init();
}

Calendar.prototype = {
    _init() {
        let _opts = this._opts; // 传入的参数
        this._nowTime = this.getDetailInfo(); // 当前时间

        // 日历开始的时间(格式 2019-5-18，未传天则默认 第一天)，
        // 若未传参数则默认为当前时间
        this._initTime = this.getDetailInfo(_opts.initTime) || this._nowTime;

        // 获取返回的月份数据（循环的数据）
        this._resOption = this._getLoopDateInfo(_opts, this._initTime);
    },

    // 根据当前的月和年份，判断后面的月份和年份
    _getLoopDateInfo(_opts, _initTime) {
        // 获取的月数(默认为1)
        let showMonth = _opts.showMonth || 1,
            arr = [],
            year = _initTime.year,
            month = _initTime.month
            ;

        for (let i = 0; i < showMonth; i++) {
            arr.push(this.getDetailInfo(`${year}-${month}`));

            if (_opts.desc) {
                month = (month - 1) <= 0 ? (() => {
                    year--;
                    return 12
                })() : month - 1;
            } else {
                month = (month + 1) > 12 ? (() => {
                    year++;
                    return 1
                })() : month + 1;
            }
        }
        // console.log(arr);

        return arr
    },
    // 获取对应的年月日
    getDetailInfo(t) {
        let date = t ? new Date(t) : new Date();
        let resObj = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            days: [],
        }
        if (!t) resObj.day = date.getDate();
        return resObj
    },
    // 判断闰年
    runNian(_year) {
        return _year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)
    },
    // 判断某年某月的几号是星期几 （默认1号）
    getFirstDay(_year, _month, _day = 1) {
        return (new Date(`${_year}-${_month}-${_day}`)).getDay();
    },
    // 获取每月的天数
    getMonthDay(_year, _month, type = 0) {
        // Date对象月份从0开始，即0表示1月份，以此类推。
        // 下面的代码中，我们初始化d为三月份的第0天（type），
        // 由于JavaScript中day的范围为1~31中的值，所以当设为0时，会向前 一天，也即表示上个月的最后一天。
        return (new Date(_year, _month, type)).getDate()
    },
    // 获取数据
    getCalendarData() {
        let _opts = this._opts;
        let resOption = this._resOption,
            _eUse = _opts.exceedNowNotUse,  // 超过当前时间是否可以使用
            _nowTime = this._nowTime
            ;

        resOption.forEach(item => {
            let sortNum = 0;
            //月份的天数
            let monthDay = this.getMonthDay(item.year, item.month);
            // 当月1号为星期几
            let firstDay = this.getFirstDay(item.year, item.month);
            item.firstDay = firstDay;

            // console.log(firstDay);
            // 显示当月1号之前的日期
            let prevMonthDay = this.getMonthDay(item.month - 1 > 0 ? item.year : item.year-1, item.month - 1 > 0 ? item.month - 1 : 12);
            console.log(firstDay - _opts.startWeek >= 0 ? firstDay - _opts.startWeek : 6 - _opts.startWeek);
            // firstDay - (1 + _opts.startWeek)
            for (let j = Math.abs(firstDay - _opts.startWeek) ; j >= 0;j--){
                item.days.push({
                    d: prevMonthDay - j,
                    sort: sortNum++,
                    canUse:false,
                });
            }
            for (let i = 1; i <= monthDay; i++) {
                item.days.push({
                    d: i,
                    sort:sortNum++,
                    canUse: !_eUse ? true :
                        !(
                            item.year > _nowTime.year ||
                            (item.year <= _nowTime.year && item.month > _nowTime.month) ||
                            (item.year <= _nowTime.year && item.month <= _nowTime.month && i > _nowTime.day)
                        ), // 日期是否能使用
                });
            }
        });

        return resOption
    },
};


export default Calendar;