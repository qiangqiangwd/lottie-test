/**
 * 该 js 用于获取日历的相关数据
 * 注意：本日历的星期显示顺序为：日 一 二 三 四 五 六
 */

/**
 * showMonth:显示的月份数（默认1个月）
 * desc：倒序显示（默认false）
 * exceedNowNotUse: 超过当前时间不可使用(默认false)
 * startWeek: 开始的星期数(默认0)[0 - 6], 默认:顺序为：日0 一1 二2 三3 四4 五5 六6
 * initTime: 当前显示的时间 (格式 2019-5-18，未传天则默认 第一天)，
 * isShowSupply: 是否在本月 数据中补齐上月下月的日期（默认 true）
 */
function Calendar(opts = {}) {
    this._opts = opts;
    // 开始的星期数
    this._opts.startWeek || (this._opts.startWeek = 0);
    this._opts.isShowSupply || (this._opts.isShowSupply = true);

    this._init();
}

Calendar.prototype = {
    _init() {
        let _opts = this._opts; // 传入的参数
        this._nowTime = this.getDetailInfo(); // 当前时间

        // 日历开始的时间(格式 2019-5-18，未传天则默认 第一天)，
        // 若未传参数则默认为当前时间
        this._initTime = _opts.initTime ? this.getDetailInfo(_opts.initTime) : this._nowTime;

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
        let [y, m, d] = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ]
        let resObj = {
            year: y,
            month: m,
            time: `${y}-${m>=10?m:'0'+m}`,
            days: [],
        }
        if (!t) resObj.day = d;
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
    // 获取数据（常规数据）
    getCalendarData() {
        let _opts = this._opts;
        let resOption = this._resOption,
            _eUse = _opts.exceedNowNotUse,  // 超过当前时间是否可以使用
            _nowTime = this._nowTime,
            _isShowSupply = _opts.isShowSupply
            ;

        resOption.forEach(item => {
            let sortNum = 0;
            //月份的天数
            let monthDay = this.getMonthDay(item.year, item.month);
            // 当月1号为星期几
            let firstDay = this.getFirstDay(item.year, item.month);
            item.firstDay = firstDay;

            // 在本月中补充上月的日期
            if (_isShowSupply){
                let prevMonth = this._addPrevNextMonth('prev', _opts, item, 0)
                item.days.push(...prevMonth);
                if (item.days.length - 1 > 0){
                    sortNum = item.days[item.days.length - 1].sort + 1; // 获取最新的排序号
                }
            }

            // 本月天数数据
            for (let i = 1; i <= monthDay; i++) {
                item.days.push({
                    d: i,
                    sort: sortNum++,
                    isToday: (item.year == _nowTime.year && item.month == _nowTime.month && i == _nowTime.day), // 是否为今天
                    canUse: !_eUse ? true :
                        !(
                            item.year > _nowTime.year ||
                            (item.year <= _nowTime.year && item.month > _nowTime.month) ||
                            (item.year <= _nowTime.year && item.month <= _nowTime.month && i > _nowTime.day)
                        ), // 日期是否能使用
                });
            }

            // 在本月中补充下月的日期
            if (_isShowSupply) {
                let nextMonth = this._addPrevNextMonth('next', _opts, item, sortNum);
                item.days.push(...nextMonth);
            }
        });

        return resOption.length <= 1 ? resOption[0] : resOption
    },
    // 补充上、下月天数（在本月中）
    _addPrevNextMonth(type, _opts, item, sortNum){
        let arr = [];
        // debugger;
        if(type === 'prev'){
            // 当月1号为星期几
            let firstDay = this.getFirstDay(item.year, item.month);
            // 上一个月有几天
            let prevMonthDay = this.getMonthDay(item.month - 1 > 0 ? item.year : item.year - 1, item.month - 1 > 0 ? item.month - 1 : 12);
            // 显示当月1号之前的日期
            let delWeek = firstDay - _opts.startWeek; //获取前面显示的上个月的天数
            for (let j = delWeek >= 0 ? delWeek : 7 + delWeek; j > 0; j--) {
                arr.push({
                    d: prevMonthDay - j + 1,
                    sort: sortNum++,
                    canUse: false,
                });
            }
        }else{
            // 判断是否需要补充
            // 42 代表 一共 6行 7列（星期数）
            let addNum = 42 - item.days.length;
            for (let i = 1; i <= addNum;i++){
                arr.push({
                    d: i,
                    sort: sortNum++,
                    canUse: false,
                });
            }
        }

        return arr
    },
};


export default Calendar;