/**
 * 该 js 用于获取日历的相关数据
 * 注意：本日历的星期显示顺序为：日 一 二 三 四 五 六
 */

/**
 * initTime: 日历初始化的时间，即数据从当前日期开始 (格式 2019-5-18，未传天则默认 第一天，showMonth 以这个为基准)
 * nowTime: 当前的时间（不传则默认当天，exceedNowNotUse，showDays 以这个为基准）
 * showMonth:显示的月份数（默认1个月）
 * showDays:显示的天数（当和 showMonth 同时存在时，以 showDays 为主）
 * desc：时间倒序显示（默认false），注意：使用倒序时必须注意星期也必须跟着倒序
 * exceedNowNotUse: 超过当前时间不可使用(默认false)
 * startWeek: 开始的星期数(默认0)[0 - 6], 默认:顺序为：日0 一1 二2 三3 四4 五5 六6
 * isShowSupply: 是否在本月 数据中补齐上月下月的日期（默认 true）
 * startRange: 选中日历起始显示范围（'2019-4-15',若无天默认第一天，下同）
 * endRange: 选中日历结束显示范围（'2019-5-20'）
 */
function Calendar(opts = {}) {
    this._opts = opts;
    // 开始的星期数
    this._opts.startWeek || (this._opts.startWeek = 0);
    // 若不为true和false，设置默认默认
    typeof this._opts.isShowSupply === 'boolean' || (this._opts.isShowSupply = true);
    typeof this._opts.showDaysType === 'next' || (this._opts.showDaysType = 'prev');
}

Calendar.prototype = {
    _init() {
        let _opts = this._opts; // 传入的参数
        this._nowTime = _opts.nowTime ? this.getDetailInfo(_opts.nowTime, true) : this.getDetailInfo(); // 当前时间

        // 日历开始的时间(格式 2019-5-18，未传天则默认 第一天)，
        // 若未传参数则默认为当前时间
        this._initTime = _opts.initTime ? this.getDetailInfo(_opts.initTime, true) : this._nowTime;

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
                [month, year] = this._getPrevMonth(month, year);
            } else {
                [month, year] = this._getNextMonth(month, year);
            }
        }
        return arr
    },
    // 获取上一个月（年）
    _getPrevMonth(month, year) {
        month = (month - 1) <= 0 ? (() => {
            year--;
            return 12
        })() : month - 1;
        return [month, year]
    },
    // 获取下一个月（年）
    _getNextMonth(month, year) {
        month = (month + 1) > 12 ? (() => {
            year++;
            return 1
        })() : month + 1;
        return [month, year]
    },
    // 获取对应的年月日
    getDetailInfo(t, f) {
        let date = t ? new Date(t) : new Date();
        let [y, m, d] = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ]
        let resObj = {
            year: y,
            month: m,
            time: `${y}-${m >= 10 ? m : '0' + m}`,
            // days: [],
        }
        if (!t || f) resObj.day = d;  // 是否显示天
        else resObj.days = [];
        return resObj
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
    getCalendarData(callback) {
        this._init(); // 对所有的数据进行初始化，防止再次调用出错

        let _opts = this._opts;
        let resOption = this._resOption,
            _nowTime = this._nowTime
            ;

        resOption.forEach(item => {
            let sortNum = 0;
            //月份的天数
            let monthDay = this.getMonthDay(item.year, item.month);
            // 当月1号为星期几
            let firstDay = this.getFirstDay(item.year, item.month);
            item.firstDay = firstDay;

            // 在本月中补充上月的日期
            let prevMonth = this._addPrevNextMonth('prev', _opts, item, 0)
            item.days.push(...prevMonth);
            if (item.days.length - 1 > 0) {
                sortNum = item.days[item.days.length - 1].sort + 1; // 获取最新的排序号
            }

            // 本月天数数据
            this.SurplusDays = false;
            for (let i = 1; i <= monthDay; i++) {
                item.days.push({
                    d: i,
                    sort: sortNum++,
                    roDate:true, // 表示为本月天数的数据
                    canUse: this._judgeTodayCanUse(item, _opts, i, monthDay)
                });
                if (item.year == _nowTime.year && item.month == _nowTime.month && i == _nowTime.day) { // 是否为今天
                    item.days[item.days.length - 1].isToday = true;
                }

                callback && callback(i); // 设置回调，参数自己设置 
            }

            // 在本月中补充下月的日期
            let nextMonth = this._addPrevNextMonth('next', _opts, item, sortNum);
            item.days.push(...nextMonth);

            if (_opts.desc) { // 倒序显示日期
                item.days.sort((a, b) => b.sort - a.sort);
            }
        });

        return resOption.length <= 1 ? resOption[0] : resOption
    },
    // 补充上、下月天数（在本月中）
    _addPrevNextMonth(type, _opts, item, sortNum) {
        let arr = [],
            isShowSupply = _opts.isShowSupply  //是否显示补充天数
            ;
        if (type === 'prev') {
            // 当月1号为星期几
            let firstDay = this.getFirstDay(item.year, item.month);
            // 上一个月有几天
            let prevMonthDay = this.getMonthDay(item.month - 1 > 0 ? item.year : item.year - 1, item.month - 1 > 0 ? item.month - 1 : 12);
            // 显示当月1号之前的日期
            let delWeek = firstDay - _opts.startWeek; //获取前面显示的上个月的天数
            for (let j = delWeek >= 0 ? delWeek : 7 + delWeek; j > 0; j--) {
                arr.push({
                    d: isShowSupply ? prevMonthDay - j + 1 : '', // 当不需要显示前时间时，内容为空
                    sort: sortNum++,
                    canUse: false,
                });
            }
        } else {
            // 判断是否需要补充
            // 必须被7整除(若想固定行数，可直接将值固定为42,6行7列)
            let addNum = (item.days.length <= 35 && !isShowSupply ? 35 : 42) - item.days.length;
            for (let i = 1; i <= addNum; i++) {
                arr.push({
                    d: isShowSupply ? i : '',
                    sort: sortNum++,
                    canUse: false,
                });
            }
        }

        return arr
    },
    /**
     * === 当前天数是否可用判断 ===
     */
    // 判断本月本天是否可以使用
    _judgeTodayCanUse(item, opts, i, monthDay) {
        let _nowTime = this._nowTime, // 当前时间
            _eUse = opts.exceedNowNotUse,  // 超过当前时间是否可以使用
            showDays = opts.showDays,  // 显示的天数（范围）
            type = opts.showDaysType
            ;
        // debugger;
        // 进行判断
        let sendOpt = [item, _nowTime, i, monthDay]; // 传入的公共参数
        let res1 = this._judgeExeceed(_eUse, ...sendOpt),
            res2 = this._judgeShowDays(showDays, ...sendOpt, type),
            res3 = this._setDateRange(opts, ...sendOpt)
        ;

        return res1 && res2 && res3
    },
    // 超过当前时间的判断
    _judgeExeceed(eUse, item, _nowTime, i) {
        return !eUse ? true : (
            item.year < _nowTime.year ||
            (item.year == _nowTime.year && item.month < _nowTime.month) ||
            (item.year == _nowTime.year && item.month == _nowTime.month && i <= _nowTime.day)
        );
    },
    // 显示的天数的判断（范围）
    _judgeShowDays(showDays, item, _nowTime, i, monthDay, type) {
        /**
         * 条件：
         * 1、当范围在本月内时
         * 2、超出本月
         */
        let day = _nowTime.day; // 当前的天数
        // 不含有天数参数直接返回 true
        // 含有时，在月份（同年份下）、年份大于当前时间，返回 false
        if (!showDays || item.year > _nowTime.year || (item.year == _nowTime.year && item.month > _nowTime.month)) {
            return !showDays
        }

        if (day >= showDays) {  // 范围不超过本月
            return (item.year == _nowTime.year && item.month == _nowTime.month) && (_nowTime.day - showDays < i && i <= _nowTime.day)
        } else {  // 超出
            if (item.year == _nowTime.year && item.month == _nowTime.month) { // 在本月内
                return i <= _nowTime.day
            } else {
                let Days = this.getMonthDay(item.year, item.month); // 当前月份的天数

                // 在本月时， 获取距离当前时间（_nowTime）的剩余天数,只获取一次防止重复获取
                if (!this.SurplusDays){
                    this.SurplusDays = this._loopGetInfo([item.month, item.year], _nowTime, showDays);
                }
                return Days - this.SurplusDays < i
            }
        }
    },
    // 返回的参数 = showDays - (initTime 距离 _nowTime 的天数) 【即本月剩余显示天数】
    _loopGetInfo(timeOpt, _nowTime,days) {
        let [m, y] = this._getNextMonth(...timeOpt); // 获取下月的月份和年份[月份,年份]
        while (!(y == _nowTime.year && m == _nowTime.month) && days > 0){
            let dNum = this.getMonthDay(y, m); // 获取下一月份的天数 
            days = days - dNum;
            [m, y] = this._getNextMonth(m,y); // 时间变化
        }

        return days - _nowTime.day
    },

    // 设置范围
    _setDateRange(opts, item, _nowTime, i, monthDay){
        /** 
         * 思路：无论是起始时间还是结束时间，
         * 当为起始时间时 startRange ，其之前的时间将不可用
         * 当为结束时间时 endRange ，其之后的时间将不可用
         **/ 
        // if (opts.startRange ||){}
        // if(){}

        // this.getCalendarData(); // 进行数据获取
    },
};


export default Calendar;