/*
 * charts for WeChat small app v1.0
 *
 * https://github.com/xiaolin3303/wx-charts
 * 2016-11-28
 *
 * Designed and built with all the love of Web
 */

'use strict';

var config = {
    yAxisWidth: 15,
    yAxisSplit: 5,
    xAxisHeight: 15,
    xAxisLineHeight: 15,
    legendHeight: 15,
    yAxisTitleWidth: 15,
    padding: 12,
    columePadding: 3,
    fontSize: 10,
    dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
    colors: ['#7cb5ec', '#f7a35c', '#434348', '#90ed7d', '#f15c80', '#8085e9'],
    pieChartLinePadding: 25,
    pieChartTextPadding: 15,
    xAxisTextPadding: 3,
    titleColor: '#333333',
    titleFontSize: 20,
    subtitleColor: '#999999',
    subtitleFontSize: 15,
    toolTipPadding: 3,
    toolTipBackground: '#000000',
    toolTipOpacity: 0.7,
    toolTipLineHeight: 14,
    radarGridCount: 3,
    radarLabelTextMargin: 15
};

// Object.assign polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target, varArgs) {
    if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}

var util = {
    toFixed: function toFixed(num, limit) {
        limit = limit || 2;
        if (this.isFloat(num)) {
            num = num.toFixed(limit);
        }
        return num;
    },
    isFloat: function isFloat(num) {
        return num % 1 !== 0;
    },
    approximatelyEqual: function approximatelyEqual(num1, num2) {
        return Math.abs(num1 - num2) < 1e-10;
    },
    isSameSign: function isSameSign(num1, num2) {
        return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
    },
    isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
        return this.isSameSign(p1.x, p2.x);
    },
    isCollision: function isCollision(obj1, obj2) {
        obj1.end = {};
        obj1.end.x = obj1.start.x + obj1.width;
        obj1.end.y = obj1.start.y - obj1.height;
        obj2.end = {};
        obj2.end.x = obj2.start.x + obj2.width;
        obj2.end.y = obj2.start.y - obj2.height;
        var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;

        return !flag;
    }
};

function findRange(num, type, limit) {
    if (isNaN(num)) {
        throw new Error('[wxCharts] unvalid series data!');
    }
    limit = limit || 10;
    type = type ? type : 'upper';
    var multiple = 1;
    while (limit < 1) {
        limit *= 10;
        multiple *= 10;
    }
    if (type === 'upper') {
        num = Math.ceil(num * multiple);
    } else {
        num = Math.floor(num * multiple);
    }
    while (num % limit !== 0) {
        if (type === 'upper') {
            num++;
        } else {
            num--;
        }
    }

    return num / multiple;
}

function calValidDistance(distance, chartData, config, opts) {

    var dataChartAreaWidth = opts.width - config.padding - chartData.xAxisPoints[0];
    var dataChartWidth = chartData.eachSpacing * opts.categories.length;
    var validDistance = distance;
    if (distance >= 0) {
        validDistance = 0;
    } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
        validDistance = dataChartAreaWidth - dataChartWidth;
    }
    return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
    function adjust(angle) {
        while (angle < 0) {
            angle += 2 * Math.PI;
        }
        while (angle > 2 * Math.PI) {
            angle -= 2 * Math.PI;
        }

        return angle;
    }

    angle = adjust(angle);
    startAngle = adjust(startAngle);
    endAngle = adjust(endAngle);
    if (startAngle > endAngle) {
        endAngle += 2 * Math.PI;
        if (angle < startAngle) {
            angle += 2 * Math.PI;
        }
    }

    return angle >= startAngle && angle <= endAngle;
}

function calRotateTranslate(x, y, h) {
    var xv = x;
    var yv = h - y;

    var transX = xv + (h - yv - xv) / Math.sqrt(2);
    transX *= -1;

    var transY = (h - yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);

    return {
        transX: transX,
        transY: transY
    };
}

function createCurveControlPoints(points, i) {

    function isNotMiddlePoint(points, i) {
        if (points[i - 1] && points[i + 1]) {
            return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y);
        } else {
            return false;
        }
    }

    var a = 0.2;
    var b = 0.2;
    var pAx = null;
    var pAy = null;
    var pBx = null;
    var pBy = null;
    if (i < 1) {
        pAx = points[0].x + (points[1].x - points[0].x) * a;
        pAy = points[0].y + (points[1].y - points[0].y) * a;
    } else {
        pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
        pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
    }

    if (i > points.length - 3) {
        var last = points.length - 1;
        pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
        pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
    } else {
        pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
        pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
    }

    // fix issue https://github.com/xiaolin3303/wx-charts/issues/79
    if (isNotMiddlePoint(points, i + 1)) {
        pBy = points[i + 1].y;
    }
    if (isNotMiddlePoint(points, i)) {
        pAy = points[i].y;
    }

    return {
        ctrA: { x: pAx, y: pAy },
        ctrB: { x: pBx, y: pBy }
    };
}

function convertCoordinateOrigin(x, y, center) {
    return {
        x: center.x + x,
        y: center.y - y
    };
}

function avoidCollision(obj, target) {
    if (target) {
        // is collision test
        while (util.isCollision(obj, target)) {
            if (obj.start.x > 0) {
                obj.start.y--;
            } else if (obj.start.x < 0) {
                obj.start.y++;
            } else {
                if (obj.start.y > 0) {
                    obj.start.y++;
                } else {
                    obj.start.y--;
                }
            }
        }
    }
    return obj;
}

function fillSeriesColor(series, config) {
    var index = 0;
    return series.map(function (item) {
        if (!item.color) {
            item.color = config.colors[index];
            index = (index + 1) % config.colors.length;
        }
        return item;
    });
}

function getDataRange(minData, maxData) {
    var limit = 0;
    var range = maxData - minData;
    if (range >= 10000) {
        limit = 1000;
    } else if (range >= 1000) {
        limit = 100;
    } else if (range >= 100) {
        limit = 10;
    } else if (range >= 10) {
        limit = 5;
    } else if (range >= 1) {
        limit = 1;
    } else if (range >= 0.1) {
        limit = 0.1;
    } else {
        limit = 0.01;
    }
    return {
        minRange: findRange(minData, 'lower', limit),
        maxRange: findRange(maxData, 'upper', limit)
    };
}

function measureText(text) {
    var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    // wx canvas 未实现measureText方法, 此处自行实现
    text = String(text);
    var text = text.split('');
    var width = 0;
    text.forEach(function (item) {
        if (/[a-zA-Z]/.test(item)) {
            width += 7;
        } else if (/[0-9]/.test(item)) {
            width += 5.5;
        } else if (/\./.test(item)) {
            width += 2.7;
        } else if (/-/.test(item)) {
            width += 3.25;
        } else if (/[\u4e00-\u9fa5]/.test(item)) {
            width += 10;
        } else if (/\(|\)/.test(item)) {
            width += 3.73;
        } else if (/\s/.test(item)) {
            width += 2.5;
        } else if (/%/.test(item)) {
            width += 8;
        } else {
            width += 10;
        }
    });
    return width * fontSize / 10;
}

function dataCombine(series) {
    return series.reduce(function (a, b) {
        return (a.data ? a.data : a).concat(b.data);
    }, []);
}

function getSeriesDataItem(series, index) {
    var data = [];
    series.forEach(function (item) {
        if (item.data[index] !== null && typeof item.data[index] !== 'undefinded') {
            var seriesItem = {};
            seriesItem.color = item.color;
            seriesItem.name = item.name;
            seriesItem.data = item.format ? item.format(item.data[index]) : item.data[index];
            data.push(seriesItem);
        }
    });

    return data;
}

function getMaxTextListLength(list) {
    var lengthList = list.map(function (item) {
        return measureText(item);
    });
    return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
    var eachAngle = 2 * Math.PI / length;
    var CoordinateSeries = [];
    for (var i = 0; i < length; i++) {
        CoordinateSeries.push(eachAngle * i);
    }

    return CoordinateSeries.map(function (item) {
        return -1 * item + Math.PI / 2;
    });
}

function getToolTipData(seriesData, calPoints, index, categories) {
    var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var textList = seriesData.map(function (item) {
        return {
            text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
            color: item.color
        };
    });
    var validCalPoints = [];
    var offset = {
        x: 0,
        y: 0
    };
    calPoints.forEach(function (points) {
        if (typeof points[index] !== 'undefinded' && points[index] !== null) {
            validCalPoints.push(points[index]);
        }
    });
    validCalPoints.forEach(function (item) {
        offset.x = Math.round(item.x);
        offset.y += item.y;
    });

    offset.y /= validCalPoints.length;
    return { textList: textList, offset: offset };
}

function findCurrentIndex(currentPoints, xAxisPoints, opts, config) {
    var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    var currentIndex = -1;
    if (isInExactChartArea(currentPoints, opts, config)) {
        xAxisPoints.forEach(function (item, index) {
            if (currentPoints.x + offset > item) {
                currentIndex = index;
            }
        });
    }

    return currentIndex;
}

function isInExactChartArea(currentPoints, opts, config) {
    return currentPoints.x < opts.width - config.padding && currentPoints.x > config.padding + config.yAxisWidth + config.yAxisTitleWidth && currentPoints.y > config.padding && currentPoints.y < opts.height - config.legendHeight - config.xAxisHeight - config.padding;
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
    var eachAngleArea = 2 * Math.PI / count;
    var currentIndex = -1;
    if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
        var fixAngle = function fixAngle(angle) {
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            if (angle > 2 * Math.PI) {
                angle -= 2 * Math.PI;
            }
            return angle;
        };

        var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
        angle = -1 * angle;
        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        var angleList = radarData.angleList.map(function (item) {
            item = fixAngle(-1 * item);

            return item;
        });

        angleList.forEach(function (item, index) {
            var rangeStart = fixAngle(item - eachAngleArea / 2);
            var rangeEnd = fixAngle(item + eachAngleArea / 2);
            if (rangeEnd < rangeStart) {
                rangeEnd += 2 * Math.PI;
            }
            if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd) {
                currentIndex = index;
            }
        });
    }

    return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData) {
    var currentIndex = -1;
    if (isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
        var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
        angle = -angle;
        for (var i = 0, len = pieData.series.length; i < len; i++) {
            var item = pieData.series[i];
            if (isInAngleRange(angle, item._start_, item._start_ + item._proportion_ * 2 * Math.PI)) {
                currentIndex = i;
                break;
            }
        }
    }

    return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
    return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

function splitPoints(points) {
    var newPoints = [];
    var items = [];
    points.forEach(function (item, index) {
        if (item !== null) {
            items.push(item);
        } else {
            if (items.length) {
                newPoints.push(items);
            }
            items = [];
        }
    });
    if (items.length) {
        newPoints.push(items);
    }

    return newPoints;
}

function calLegendData(series, opts, config) {
    if (opts.legend === false) {
        return {
            legendList: [],
            legendHeight: 0
        };
    }
    var padding = 5;
    var marginTop = 8;
    var shapeWidth = 15;
    var legendList = [];
    var widthCount = 0;
    var currentRow = [];
    series.forEach(function (item) {
        var itemWidth = 3 * padding + shapeWidth + measureText(item.name || 'undefinded');
        if (widthCount + itemWidth > opts.width) {
            legendList.push(currentRow);
            widthCount = itemWidth;
            currentRow = [item];
        } else {
            widthCount += itemWidth;
            currentRow.push(item);
        }
    });
    if (currentRow.length) {
        legendList.push(currentRow);
    }

    return {
        legendList: legendList,
        legendHeight: legendList.length * (config.fontSize + marginTop) + padding
    };
}

function calCategoriesData(categories, opts, config) {
    var result = {
        angle: 0,
        xAxisHeight: config.xAxisHeight
    };

    var _getXAxisPoints = getXAxisPoints(categories, opts, config),
        eachSpacing = _getXAxisPoints.eachSpacing;

    // get max length of categories text


    var categoriesTextLenth = categories.map(function (item) {
        return measureText(item);
    });

    var maxTextLength = Math.max.apply(this, categoriesTextLenth);

    if (maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
        result.angle = 45 * Math.PI / 180;
        result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
    }

    return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
    var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

    var radarOption = opts.extra.radar || {};
    radarOption.max = radarOption.max || 0;
    var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));

    var data = [];
    series.forEach(function (each) {
        var listItem = {};
        listItem.color = each.color;
        listItem.data = [];
        each.data.forEach(function (item, index) {
            var tmp = {};
            tmp.angle = angleList[index];

            tmp.proportion = item / maxData;
            tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
            listItem.data.push(tmp);
        });

        data.push(listItem);
    });

    return data;
}

function getPieDataPoints(series) {
    var process = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var count = 0;
    var _start_ = 0;
    series.forEach(function (item) {
        item.data = item.data === null ? 0 : item.data;
        count += item.data;
    });
    series.forEach(function (item) {
        item.data = item.data === null ? 0 : item.data;
        item._proportion_ = item.data / count * process;
    });
    series.forEach(function (item) {
        item._start_ = _start_;
        _start_ += 2 * item._proportion_ * Math.PI;
    });

    return series;
}

function getPieTextMaxLength(series) {
    series = getPieDataPoints(series);
    var maxLength = 0;
    series.forEach(function (item) {
        var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
        maxLength = Math.max(maxLength, measureText(text));
    });

    return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
    return points.map(function (item) {
        if (item === null) {
            return null;
        }
        item.width = (eachSpacing - 2 * config.columePadding) / columnLen;

        if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
            // customer column width
            item.width = Math.min(item.width, +opts.extra.column.width);
        } else {
            // default width should less tran 25px
            // don't ask me why, I don't know
            item.width = Math.min(item.width, 25);
        }
        item.x += (index + 0.5 - columnLen / 2) * item.width;

        return item;
    });
}

function getXAxisPoints(categories, opts, config) {
    var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
    var spacingValid = opts.width - 2 * config.padding - yAxisTotalWidth;
    var dataCount = opts.enableScroll ? Math.min(5, categories.length) : categories.length;
    var eachSpacing = spacingValid / dataCount;

    var xAxisPoints = [];
    var startX = config.padding + yAxisTotalWidth;
    var endX = opts.width - config.padding;
    categories.forEach(function (item, index) {
        xAxisPoints.push(startX + index * eachSpacing);
    });
    if (opts.enableScroll === true) {
        xAxisPoints.push(startX + categories.length * eachSpacing);
    } else {
        xAxisPoints.push(endX);
    }

    return { xAxisPoints: xAxisPoints, startX: startX, endX: endX, eachSpacing: eachSpacing };
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
    var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;

    var points = [];
    var validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
    data.forEach(function (item, index) {
        if (item === null) {
            points.push(null);
        } else {
            var point = {};
            point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
            var height = validHeight * (item - minRange) / (maxRange - minRange);
            height *= process;
            point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
            points.push(point);
        }
    });

    return points;
}

function getYAxisTextList(series, opts, config) {
    var data = dataCombine(series);
    // remove null from data
    data = data.filter(function (item) {
        return item !== null;
    });
    var minData = Math.min.apply(this, data);
    var maxData = Math.max.apply(this, data);
    if (typeof opts.yAxis.min === 'number') {
        minData = Math.min(opts.yAxis.min, minData);
    }
    if (typeof opts.yAxis.max === 'number') {
        maxData = Math.max(opts.yAxis.max, maxData);
    }

    // fix issue https://github.com/xiaolin3303/wx-charts/issues/9
    if (minData === maxData) {
        var rangeSpan = maxData || 1;
        minData -= rangeSpan;
        maxData += rangeSpan;
    }

    var dataRange = getDataRange(minData, maxData);
    var minRange = dataRange.minRange;
    var maxRange = dataRange.maxRange;

    var range = [];
    var eachRange = (maxRange - minRange) / config.yAxisSplit;

    for (var i = 0; i <= config.yAxisSplit; i++) {
        range.push(minRange + eachRange * i);
    }
    return range.reverse();
}

function calYAxisData(series, opts, config) {

    var ranges = getYAxisTextList(series, opts, config);
    var yAxisWidth = config.yAxisWidth;
    var rangesFormat = ranges.map(function (item) {
        item = util.toFixed(item, 2);
        item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
        yAxisWidth = Math.max(yAxisWidth, measureText(item) + 5);
        return item;
    });
    if (opts.yAxis.disabled === true) {
        yAxisWidth = 0;
    }

    return { rangesFormat: rangesFormat, ranges: ranges, yAxisWidth: yAxisWidth };
}

function drawPointShape(points, color, shape, context) {
    context.beginPath();
    context.setStrokeStyle("#ffffff");
    context.setLineWidth(1);
    context.setFillStyle(color);

    if (shape === 'diamond') {
        points.forEach(function (item, index) {
            if (item !== null) {
                context.moveTo(item.x, item.y - 4.5);
                context.lineTo(item.x - 4.5, item.y);
                context.lineTo(item.x, item.y + 4.5);
                context.lineTo(item.x + 4.5, item.y);
                context.lineTo(item.x, item.y - 4.5);
            }
        });
    } else if (shape === 'circle') {
        points.forEach(function (item, index) {
            if (item !== null) {
                context.moveTo(item.x + 3.5, item.y);
                context.arc(item.x, item.y, 4, 0, 2 * Math.PI, false);
            }
        });
    } else if (shape === 'rect') {
        points.forEach(function (item, index) {
            if (item !== null) {
                context.moveTo(item.x - 3.5, item.y - 3.5);
                context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
            }
        });
    } else if (shape === 'triangle') {
        points.forEach(function (item, index) {
            if (item !== null) {
                context.moveTo(item.x, item.y - 4.5);
                context.lineTo(item.x - 4.5, item.y + 4.5);
                context.lineTo(item.x + 4.5, item.y + 4.5);
                context.lineTo(item.x, item.y - 4.5);
            }
        });
    }
    context.closePath();
    context.fill();
    context.stroke();
}

function drawRingTitle(opts, config, context) {
    var titlefontSize = opts.title.fontSize || config.titleFontSize;
    var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
    var title = opts.title.name || '';
    var subtitle = opts.subtitle.name || '';
    var titleFontColor = opts.title.color || config.titleColor;
    var subtitleFontColor = opts.subtitle.color || config.subtitleColor;
    var titleHeight = title ? titlefontSize : 0;
    var subtitleHeight = subtitle ? subtitlefontSize : 0;
    var margin = 5;
    if (subtitle) {
        var textWidth = measureText(subtitle, subtitlefontSize);
        var startX = (opts.width - textWidth) / 2 + (opts.subtitle.offsetX || 0);
        var startY = (opts.height - config.legendHeight + subtitlefontSize) / 2;
        if (title) {
            startY -= (titleHeight + margin) / 2;
        }
        context.beginPath();
        context.setFontSize(subtitlefontSize);
        context.setFillStyle(subtitleFontColor);
        context.fillText(subtitle, startX, startY);
        context.stroke();
        context.closePath();
    }
    if (title) {
        var _textWidth = measureText(title, titlefontSize);
        var _startX = (opts.width - _textWidth) / 2 + (opts.title.offsetX || 0);
        var _startY = (opts.height - config.legendHeight + titlefontSize) / 2;
        if (subtitle) {
            _startY += (subtitleHeight + margin) / 2;
        }
        context.beginPath();
        context.setFontSize(titlefontSize);
        context.setFillStyle(titleFontColor);
        context.fillText(title, _startX, _startY);
        context.stroke();
        context.closePath();
    }
}

function drawPointText(points, series, config, context) {
    // 绘制数据文案
    var data = series.data;

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#666666');
    points.forEach(function (item, index) {
        if (item !== null) {
            var formatVal = series.format ? series.format(data[index]) : data[index];
            context.fillText(formatVal, item.x - measureText(formatVal) / 2, item.y - 2);
        }
    });
    context.closePath();
    context.stroke();
}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
    var radarOption = opts.extra.radar || {};
    radius += config.radarLabelTextMargin;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(radarOption.labelColor || '#666666');
    angleList.forEach(function (angle, index) {
        var pos = {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        };
        var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
        var startX = posRelativeCanvas.x;
        var startY = posRelativeCanvas.y;
        if (util.approximatelyEqual(pos.x, 0)) {
            startX -= measureText(opts.categories[index] || '') / 2;
        } else if (pos.x < 0) {
            startX -= measureText(opts.categories[index] || '');
        }
        context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
    });
    context.stroke();
    context.closePath();
}

function drawPieText(series, opts, config, context, radius, center) {
    var lineRadius = radius + config.pieChartLinePadding;
    var textObjectCollection = [];
    var lastTextObject = null;

    var seriesConvert = series.map(function (item) {
        var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
        var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
        var color = item.color;
        return { arc: arc, text: text, color: color };
    });
    seriesConvert.forEach(function (item) {
        // line end
        var orginX1 = Math.cos(item.arc) * lineRadius;
        var orginY1 = Math.sin(item.arc) * lineRadius;

        // line start
        var orginX2 = Math.cos(item.arc) * radius;
        var orginY2 = Math.sin(item.arc) * radius;

        // text start
        var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
        var orginY3 = orginY1;

        var textWidth = measureText(item.text);
        var startY = orginY3;

        if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, { x: orginX3 })) {
            if (orginX3 > 0) {
                startY = Math.min(orginY3, lastTextObject.start.y);
            } else if (orginX1 < 0) {
                startY = Math.max(orginY3, lastTextObject.start.y);
            } else {
                if (orginY3 > 0) {
                    startY = Math.max(orginY3, lastTextObject.start.y);
                } else {
                    startY = Math.min(orginY3, lastTextObject.start.y);
                }
            }
        }

        if (orginX3 < 0) {
            orginX3 -= textWidth;
        }

        var textObject = {
            lineStart: {
                x: orginX2,
                y: orginY2
            },
            lineEnd: {
                x: orginX1,
                y: orginY1
            },
            start: {
                x: orginX3,
                y: startY
            },
            width: textWidth,
            height: config.fontSize,
            text: item.text,
            color: item.color
        };

        lastTextObject = avoidCollision(textObject, lastTextObject);
        textObjectCollection.push(lastTextObject);
    });

    textObjectCollection.forEach(function (item) {
        var lineStartPoistion = convertCoordinateOrigin(item.lineStart.x, item.lineStart.y, center);
        var lineEndPoistion = convertCoordinateOrigin(item.lineEnd.x, item.lineEnd.y, center);
        var textPosition = convertCoordinateOrigin(item.start.x, item.start.y, center);
        context.setLineWidth(1);
        context.setFontSize(config.fontSize);
        context.beginPath();
        context.setStrokeStyle(item.color);
        context.setFillStyle(item.color);
        context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
        var curveStartX = item.start.x < 0 ? textPosition.x + item.width : textPosition.x;
        var textStartX = item.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
        context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
        context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(textPosition.x + item.width, textPosition.y);
        context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.beginPath();
        context.setFillStyle('#666666');
        context.fillText(item.text, textStartX, textPosition.y + 3);
        context.closePath();
        context.stroke();

        context.closePath();
    });
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
    var startY = config.padding;
    var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
    context.beginPath();
    context.setStrokeStyle('#cccccc');
    context.setLineWidth(1);
    context.moveTo(offsetX, startY);
    context.lineTo(offsetX, endY);
    context.stroke();
    context.closePath();
}

function drawToolTip(textList, offset, opts, config, context) {
    var legendWidth = 4;
    var legendMarginRight = 5;
    var arrowWidth = 8;
    var isOverRightBorder = false;
    offset = assign({
        x: 0,
        y: 0
    }, offset);
    offset.y -= 8;
    var textWidth = textList.map(function (item) {
        return measureText(item.text);
    });

    var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
    var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;

    // if beyond the right border
    if (offset.x - Math.abs(opts._scrollDistance_) + arrowWidth + toolTipWidth > opts.width) {
        isOverRightBorder = true;
    }

    // draw background rect
    context.beginPath();
    context.setFillStyle(opts.tooltip.option.background || config.toolTipBackground);
    context.setGlobalAlpha(config.toolTipOpacity);
    if (isOverRightBorder) {
        context.moveTo(offset.x, offset.y + 10);
        context.lineTo(offset.x - arrowWidth, offset.y + 10 - 5);
        context.lineTo(offset.x - arrowWidth, offset.y + 10 + 5);
        context.moveTo(offset.x, offset.y + 10);
        context.fillRect(offset.x - toolTipWidth - arrowWidth, offset.y, toolTipWidth, toolTipHeight);
    } else {
        context.moveTo(offset.x, offset.y + 10);
        context.lineTo(offset.x + arrowWidth, offset.y + 10 - 5);
        context.lineTo(offset.x + arrowWidth, offset.y + 10 + 5);
        context.moveTo(offset.x, offset.y + 10);
        context.fillRect(offset.x + arrowWidth, offset.y, toolTipWidth, toolTipHeight);
    }

    context.closePath();
    context.fill();
    context.setGlobalAlpha(1);

    // draw legend
    textList.forEach(function (item, index) {
        context.beginPath();
        context.setFillStyle(item.color);
        var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
        var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
        if (isOverRightBorder) {
            startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
        }
        context.fillRect(startX, startY, legendWidth, config.fontSize);
        context.closePath();
    });

    // draw text list
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#ffffff');
    textList.forEach(function (item, index) {
        var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
        if (isOverRightBorder) {
            startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
        }
        var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
        context.fillText(item.text, startX, startY + config.fontSize);
    });
    context.stroke();
    context.closePath();
}

function drawYAxisTitle(title, opts, config, context) {
    var startX = config.xAxisHeight + (opts.height - config.xAxisHeight - measureText(title)) / 2;
    context.save();
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(opts.yAxis.titleFontColor || '#333333');
    context.translate(0, opts.height);
    context.rotate(-90 * Math.PI / 180);
    context.fillText(title, startX, config.padding + 0.5 * config.fontSize);
    context.stroke();
    context.closePath();
    context.restore();
}

function drawColumnDataPoints(series, opts, config, context) {
    var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    var _calYAxisData = calYAxisData(series, opts, config),
        ranges = _calYAxisData.ranges;

    var _getXAxisPoints = getXAxisPoints(opts.categories, opts, config),
        xAxisPoints = _getXAxisPoints.xAxisPoints,
        eachSpacing = _getXAxisPoints.eachSpacing;

    var minRange = ranges.pop();
    var maxRange = ranges.shift();
    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
        context.translate(opts._scrollDistance_, 0);
    }

    series.forEach(function (eachSeries, seriesIndex) {
        var data = eachSeries.data;
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);

        // 绘制柱状数据图
        context.beginPath();
        context.setFillStyle(eachSeries.color);
        points.forEach(function (item, index) {
            if (item !== null) {
                var startX = item.x - item.width / 2 + 1;
                var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
                context.moveTo(startX, item.y);
                context.rect(startX, item.y, item.width - 2, height);
            }
        });
        context.closePath();
        context.fill();
    });
    series.forEach(function (eachSeries, seriesIndex) {
        var data = eachSeries.data;
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
        if (opts.dataLabel !== false && process === 1) {
            drawPointText(points, eachSeries, config, context);
        }
    });
    context.restore();
    return {
        xAxisPoints: xAxisPoints,
        eachSpacing: eachSpacing
    };
}

function drawAreaDataPoints(series, opts, config, context) {
    var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    var _calYAxisData2 = calYAxisData(series, opts, config),
        ranges = _calYAxisData2.ranges;

    var _getXAxisPoints2 = getXAxisPoints(opts.categories, opts, config),
        xAxisPoints = _getXAxisPoints2.xAxisPoints,
        eachSpacing = _getXAxisPoints2.eachSpacing;

    var minRange = ranges.pop();
    var maxRange = ranges.shift();
    var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
    var calPoints = [];

    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
        context.translate(opts._scrollDistance_, 0);
    }

    if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
        drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
    }

    series.forEach(function (eachSeries, seriesIndex) {
        var data = eachSeries.data;
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);

        var splitPointList = splitPoints(points);

        splitPointList.forEach(function (points) {
            // 绘制区域数据
            context.beginPath();
            context.setStrokeStyle(eachSeries.color);
            context.setFillStyle(eachSeries.color);
            context.setGlobalAlpha(0.6);
            context.setLineWidth(2);
            if (points.length > 1) {
                var firstPoint = points[0];
                var lastPoint = points[points.length - 1];

                context.moveTo(firstPoint.x, firstPoint.y);
                if (opts.extra.lineStyle === 'curve') {
                    points.forEach(function (item, index) {
                        if (index > 0) {
                            var ctrlPoint = createCurveControlPoints(points, index - 1);
                            context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
                        }
                    });
                } else {
                    points.forEach(function (item, index) {
                        if (index > 0) {
                            context.lineTo(item.x, item.y);
                        }
                    });
                }

                context.lineTo(lastPoint.x, endY);
                context.lineTo(firstPoint.x, endY);
                context.lineTo(firstPoint.x, firstPoint.y);
            } else {
                var item = points[0];
                context.moveTo(item.x - eachSpacing / 2, item.y);
                context.lineTo(item.x + eachSpacing / 2, item.y);
                context.lineTo(item.x + eachSpacing / 2, endY);
                context.lineTo(item.x - eachSpacing / 2, endY);
                context.moveTo(item.x - eachSpacing / 2, item.y);
            }
            context.closePath();
            context.fill();
            context.setGlobalAlpha(1);
        });

        if (opts.dataPointShape !== false) {
            var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
            drawPointShape(points, eachSeries.color, shape, context);
        }
    });
    if (opts.dataLabel !== false && process === 1) {
        series.forEach(function (eachSeries, seriesIndex) {
            var data = eachSeries.data;
            var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
            drawPointText(points, eachSeries, config, context);
        });
    }

    context.restore();

    return {
        xAxisPoints: xAxisPoints,
        calPoints: calPoints,
        eachSpacing: eachSpacing
    };
}

function drawLineDataPoints(series, opts, config, context) {
    var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    var _calYAxisData3 = calYAxisData(series, opts, config),
        ranges = _calYAxisData3.ranges;

    var _getXAxisPoints3 = getXAxisPoints(opts.categories, opts, config),
        xAxisPoints = _getXAxisPoints3.xAxisPoints,
        eachSpacing = _getXAxisPoints3.eachSpacing;

    var minRange = ranges.pop();
    var maxRange = ranges.shift();
    var calPoints = [];

    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
        context.translate(opts._scrollDistance_, 0);
    }

    if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
        drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
    }

    series.forEach(function (eachSeries, seriesIndex) {
        var data = eachSeries.data;
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);
        var splitPointList = splitPoints(points);

        splitPointList.forEach(function (points, index) {
            context.beginPath();
            context.setStrokeStyle(eachSeries.color);
            context.setLineWidth(2);
            if (points.length === 1) {
                context.moveTo(points[0].x, points[0].y);
                context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
            } else {
                context.moveTo(points[0].x, points[0].y);
                if (opts.extra.lineStyle === 'curve') {
                    points.forEach(function (item, index) {
                        if (index > 0) {
                            var ctrlPoint = createCurveControlPoints(points, index - 1);
                            context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
                        }
                    });
                } else {
                    points.forEach(function (item, index) {
                        if (index > 0) {
                            context.lineTo(item.x, item.y);
                        }
                    });
                }
                context.moveTo(points[0].x, points[0].y);
            }
            context.closePath();
            context.stroke();
        });

        if (opts.dataPointShape !== false) {
            var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
            drawPointShape(points, eachSeries.color, shape, context);
        }
    });
    if (opts.dataLabel !== false && process === 1) {
        series.forEach(function (eachSeries, seriesIndex) {
            var data = eachSeries.data;
            var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
            drawPointText(points, eachSeries, config, context);
        });
    }

    context.restore();

    return {
        xAxisPoints: xAxisPoints,
        calPoints: calPoints,
        eachSpacing: eachSpacing
    };
}

function drawToolTipBridge(opts, config, context, process) {
    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
        context.translate(opts._scrollDistance_, 0);
    }
    if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
        drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context);
    }
    context.restore();
}

function drawXAxis(categories, opts, config, context) {
    var _getXAxisPoints4 = getXAxisPoints(categories, opts, config),
        xAxisPoints = _getXAxisPoints4.xAxisPoints,
        startX = _getXAxisPoints4.startX,
        endX = _getXAxisPoints4.endX,
        eachSpacing = _getXAxisPoints4.eachSpacing;

    var startY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
    var endY = startY + config.xAxisLineHeight;

    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
        context.translate(opts._scrollDistance_, 0);
    }

    context.beginPath();
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");

    if (opts.xAxis.disableGrid !== true) {
        if (opts.xAxis.type === 'calibration') {
            xAxisPoints.forEach(function (item, index) {
                if (index > 0) {
                    context.moveTo(item - eachSpacing / 2, startY);
                    context.lineTo(item - eachSpacing / 2, startY + 4);
                }
            });
        } else {
            xAxisPoints.forEach(function (item, index) {
                context.moveTo(item, startY);
                context.lineTo(item, endY);
            });
        }
    }
    context.closePath();
    context.stroke();

    // 对X轴列表做抽稀处理
    var validWidth = opts.width - 2 * config.padding - config.yAxisWidth - config.yAxisTitleWidth;
    var maxXAxisListLength = Math.min(categories.length, Math.ceil(validWidth / config.fontSize / 1.5));
    var ratio = Math.ceil(categories.length / maxXAxisListLength);

    categories = categories.map(function (item, index) {
        return index % ratio !== 0 ? '' : item;
    });

    if (config._xAxisTextAngle_ === 0) {
        context.beginPath();
        context.setFontSize(config.fontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        categories.forEach(function (item, index) {
            var offset = eachSpacing / 2 - measureText(item) / 2;
            context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
        });
        context.closePath();
        context.stroke();
    } else {
        categories.forEach(function (item, index) {
            context.save();
            context.beginPath();
            context.setFontSize(config.fontSize);
            context.setFillStyle(opts.xAxis.fontColor || '#666666');
            var textWidth = measureText(item);
            var offset = eachSpacing / 2 - textWidth;

            var _calRotateTranslate = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + config.fontSize / 2 + 5, opts.height),
                transX = _calRotateTranslate.transX,
                transY = _calRotateTranslate.transY;

            context.rotate(-1 * config._xAxisTextAngle_);
            context.translate(transX, transY);
            context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
            context.closePath();
            context.stroke();
            context.restore();
        });
    }

    context.restore();
}

function drawYAxisGrid(opts, config, context) {
    var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
    var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
    var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
    var startX = config.padding + yAxisTotalWidth;
    var endX = opts.width - config.padding;

    var points = [];
    for (var i = 0; i < config.yAxisSplit; i++) {
        points.push(config.padding + eachSpacing * i);
    }
    points.push(config.padding + eachSpacing * config.yAxisSplit + 2);

    context.beginPath();
    context.setStrokeStyle(opts.yAxis.gridColor || "#cccccc");
    context.setLineWidth(1);
    points.forEach(function (item, index) {
        context.moveTo(startX, item);
        context.lineTo(endX, item);
    });
    context.closePath();
    context.stroke();
}

function drawYAxis(series, opts, config, context) {
    if (opts.yAxis.disabled === true) {
        return;
    }

    var _calYAxisData4 = calYAxisData(series, opts, config),
        rangesFormat = _calYAxisData4.rangesFormat;

    var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;

    var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
    var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
    var startX = config.padding + yAxisTotalWidth;
    var endX = opts.width - config.padding;
    var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;

    // set YAxis background
    context.setFillStyle(opts.background || '#ffffff');
    if (opts._scrollDistance_ < 0) {
        context.fillRect(0, 0, startX, endY + config.xAxisHeight + 5);
    }
    context.fillRect(endX, 0, opts.width, endY + config.xAxisHeight + 5);

    var points = [];
    for (var i = 0; i <= config.yAxisSplit; i++) {
        points.push(config.padding + eachSpacing * i);
    }

    context.stroke();
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(opts.yAxis.fontColor || '#666666');
    rangesFormat.forEach(function (item, index) {
        var pos = points[index] ? points[index] : endY;
        context.fillText(item, config.padding + config.yAxisTitleWidth, pos + config.fontSize / 2);
    });
    context.closePath();
    context.stroke();

    if (opts.yAxis.title) {
        drawYAxisTitle(opts.yAxis.title, opts, config, context);
    }
}

function drawLegend(series, opts, config, context) {
    if (!opts.legend) {
        return;
    }
    // each legend shape width 15px
    // the spacing between shape and text in each legend is the `padding`
    // each legend spacing is the `padding`
    // legend margin top `config.padding`

    var _calLegendData = calLegendData(series, opts, config),
        legendList = _calLegendData.legendList;

    var padding = 5;
    var marginTop = 8;
    var shapeWidth = 15;
    legendList.forEach(function (itemList, listIndex) {
        var width = 0;
        itemList.forEach(function (item) {
            item.name = item.name || 'undefined';
            width += 3 * padding + measureText(item.name) + shapeWidth;
        });
        var startX = (opts.width - width) / 2 + padding;
        var startY = opts.height - config.padding - config.legendHeight + listIndex * (config.fontSize + marginTop) + padding + marginTop;

        context.setFontSize(config.fontSize);
        itemList.forEach(function (item) {
            switch (opts.type) {
                case 'line':
                    context.beginPath();
                    context.setLineWidth(1);
                    context.setStrokeStyle(item.color);
                    context.moveTo(startX - 2, startY + 5);
                    context.lineTo(startX + 17, startY + 5);
                    context.stroke();
                    context.closePath();
                    context.beginPath();
                    context.setLineWidth(1);
                    context.setStrokeStyle('#ffffff');
                    context.setFillStyle(item.color);
                    context.moveTo(startX + 7.5, startY + 5);
                    context.arc(startX + 7.5, startY + 5, 4, 0, 2 * Math.PI);
                    context.fill();
                    context.stroke();
                    context.closePath();
                    break;
                case 'pie':
                case 'ring':
                    context.beginPath();
                    context.setFillStyle(item.color);
                    context.moveTo(startX + 7.5, startY + 5);
                    context.arc(startX + 7.5, startY + 5, 7, 0, 2 * Math.PI);
                    context.closePath();
                    context.fill();
                    break;
                default:
                    context.beginPath();
                    context.setFillStyle(item.color);
                    context.moveTo(startX, startY);
                    context.rect(startX, startY, 15, 10);
                    context.closePath();
                    context.fill();
            }
            startX += padding + shapeWidth;
            context.beginPath();
            context.setFillStyle(opts.extra.legendTextColor || '#333333');
            context.fillText(item.name, startX, startY + 9);
            context.closePath();
            context.stroke();
            startX += measureText(item.name) + 2 * padding;
        });
    });
}
function drawPieDataPoints(series, opts, config, context) {
    var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    var pieOption = opts.extra.pie || {};
    series = getPieDataPoints(series, process);
    var centerPosition = {
        x: opts.width / 2,
        y: (opts.height - config.legendHeight) / 2
    };
    var radius = Math.min(centerPosition.x - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, centerPosition.y - config.pieChartLinePadding - config.pieChartTextPadding);
    if (opts.dataLabel) {
        radius -= 10;
    } else {
        radius -= 2 * config.padding;
    }
    series = series.map(function (eachSeries) {
        eachSeries._start_ += (pieOption.offsetAngle || 0) * Math.PI / 180;
        return eachSeries;
    });
    series.forEach(function (eachSeries) {
        context.beginPath();
        context.setLineWidth(2);
        context.setStrokeStyle('#ffffff');
        context.setFillStyle(eachSeries.color);
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
        if (opts.disablePieStroke !== true) {
            context.stroke();
        }
    });

    if (opts.type === 'ring') {
        var innerPieWidth = radius * 0.6;
        if (typeof opts.extra.ringWidth === 'number' && opts.extra.ringWidth > 0) {
            innerPieWidth = Math.max(0, radius - opts.extra.ringWidth);
        }
        context.beginPath();
        context.setFillStyle(opts.background || '#ffffff');
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }

    if (opts.dataLabel !== false && process === 1) {
        // fix https://github.com/xiaolin3303/wx-charts/issues/132
        var valid = false;
        for (var i = 0, len = series.length; i < len; i++) {
            if (series[i].data > 0) {
                valid = true;
                break;
            }
        }

        if (valid) {
            drawPieText(series, opts, config, context, radius, centerPosition);
        }
    }

    if (process === 1 && opts.type === 'ring') {
        drawRingTitle(opts, config, context);
    }

    return {
        center: centerPosition,
        radius: radius,
        series: series
    };
}

function drawRadarDataPoints(series, opts, config, context) {
    var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    var radarOption = opts.extra.radar || {};
    var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
    var centerPosition = {
        x: opts.width / 2,
        y: (opts.height - config.legendHeight) / 2
    };

    var radius = Math.min(centerPosition.x - (getMaxTextListLength(opts.categories) + config.radarLabelTextMargin), centerPosition.y - config.radarLabelTextMargin);

    radius -= config.padding;

    // draw grid
    context.beginPath();
    context.setLineWidth(1);
    context.setStrokeStyle(radarOption.gridColor || "#cccccc");
    coordinateAngle.forEach(function (angle) {
        var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
        context.moveTo(centerPosition.x, centerPosition.y);
        context.lineTo(pos.x, pos.y);
    });
    context.stroke();
    context.closePath();

    // draw split line grid

    var _loop = function _loop(i) {
        var startPos = {};
        context.beginPath();
        context.setLineWidth(1);
        context.setStrokeStyle(radarOption.gridColor || "#cccccc");
        coordinateAngle.forEach(function (angle, index) {
            var pos = convertCoordinateOrigin(radius / config.radarGridCount * i * Math.cos(angle), radius / config.radarGridCount * i * Math.sin(angle), centerPosition);
            if (index === 0) {
                startPos = pos;
                context.moveTo(pos.x, pos.y);
            } else {
                context.lineTo(pos.x, pos.y);
            }
        });
        context.lineTo(startPos.x, startPos.y);
        context.stroke();
        context.closePath();
    };

    for (var i = 1; i <= config.radarGridCount; i++) {
        _loop(i);
    }

    var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);
    radarDataPoints.forEach(function (eachSeries, seriesIndex) {
        // 绘制区域数据
        context.beginPath();
        context.setFillStyle(eachSeries.color);
        context.setGlobalAlpha(0.6);
        eachSeries.data.forEach(function (item, index) {
            if (index === 0) {
                context.moveTo(item.position.x, item.position.y);
            } else {
                context.lineTo(item.position.x, item.position.y);
            }
        });
        context.closePath();
        context.fill();
        context.setGlobalAlpha(1);

        if (opts.dataPointShape !== false) {
            var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
            var points = eachSeries.data.map(function (item) {
                return item.position;
            });
            drawPointShape(points, eachSeries.color, shape, context);
        }
    });
    // draw label text
    drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);

    return {
        center: centerPosition,
        radius: radius,
        angleList: coordinateAngle
    };
}

function drawCanvas(opts, context) {
    context.draw();
}

var Timing = {
    easeIn: function easeIn(pos) {
        return Math.pow(pos, 3);
    },

    easeOut: function easeOut(pos) {
        return Math.pow(pos - 1, 3) + 1;
    },

    easeInOut: function easeInOut(pos) {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 3);
        } else {
            return 0.5 * (Math.pow(pos - 2, 3) + 2);
        }
    },

    linear: function linear(pos) {
        return pos;
    }
};

function Animation(opts) {
    this.isStop = false;
    opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
    opts.timing = opts.timing || 'linear';

    var delay = 17;

    var createAnimationFrame = function createAnimationFrame() {
        if (typeof requestAnimationFrame !== 'undefined') {
            return requestAnimationFrame;
        } else if (typeof setTimeout !== 'undefined') {
            return function (step, delay) {
                setTimeout(function () {
                    var timeStamp = +new Date();
                    step(timeStamp);
                }, delay);
            };
        } else {
            return function (step) {
                step(null);
            };
        }
    };
    var animationFrame = createAnimationFrame();
    var startTimeStamp = null;
    var _step = function step(timestamp) {
        if (timestamp === null || this.isStop === true) {
            opts.onProcess && opts.onProcess(1);
            opts.onAnimationFinish && opts.onAnimationFinish();
            return;
        }
        if (startTimeStamp === null) {
            startTimeStamp = timestamp;
        }
        if (timestamp - startTimeStamp < opts.duration) {
            var process = (timestamp - startTimeStamp) / opts.duration;
            var timingFunction = Timing[opts.timing];
            process = timingFunction(process);
            opts.onProcess && opts.onProcess(process);
            animationFrame(_step, delay);
        } else {
            opts.onProcess && opts.onProcess(1);
            opts.onAnimationFinish && opts.onAnimationFinish();
        }
    };
    _step = _step.bind(this);

    animationFrame(_step, delay);
}

// stop animation immediately
// and tigger onAnimationFinish
Animation.prototype.stop = function () {
    this.isStop = true;
};

function drawCharts(type, opts, config, context) {
    var _this = this;

    var series = opts.series;
    var categories = opts.categories;
    series = fillSeriesColor(series, config);

    var _calLegendData = calLegendData(series, opts, config),
        legendHeight = _calLegendData.legendHeight;

    config.legendHeight = legendHeight;

    var _calYAxisData = calYAxisData(series, opts, config),
        yAxisWidth = _calYAxisData.yAxisWidth;

    config.yAxisWidth = yAxisWidth;
    if (categories && categories.length) {
        var _calCategoriesData = calCategoriesData(categories, opts, config),
            xAxisHeight = _calCategoriesData.xAxisHeight,
            angle = _calCategoriesData.angle;

        config.xAxisHeight = xAxisHeight;
        config._xAxisTextAngle_ = angle;
    }
    if (type === 'pie' || type === 'ring') {
        config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(series);
    }

    var duration = opts.animation ? 1000 : 0;
    this.animationInstance && this.animationInstance.stop();
    switch (type) {
        case 'line':
            this.animationInstance = new Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: function onProcess(process) {
                    drawYAxisGrid(opts, config, context);

                    var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
                        xAxisPoints = _drawLineDataPoints.xAxisPoints,
                        calPoints = _drawLineDataPoints.calPoints,
                        eachSpacing = _drawLineDataPoints.eachSpacing;

                    _this.chartData.xAxisPoints = xAxisPoints;
                    _this.chartData.calPoints = calPoints;
                    _this.chartData.eachSpacing = eachSpacing;
                    drawXAxis(categories, opts, config, context);
                    drawLegend(opts.series, opts, config, context);
                    drawYAxis(series, opts, config, context);
                    drawToolTipBridge(opts, config, context, process);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: function onAnimationFinish() {
                    _this.event.trigger('renderComplete');
                }
            });
            break;
        case 'column':
            this.animationInstance = new Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: function onProcess(process) {
                    drawYAxisGrid(opts, config, context);

                    var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
                        xAxisPoints = _drawColumnDataPoints.xAxisPoints,
                        eachSpacing = _drawColumnDataPoints.eachSpacing;

                    _this.chartData.xAxisPoints = xAxisPoints;
                    _this.chartData.eachSpacing = eachSpacing;
                    drawXAxis(categories, opts, config, context);
                    drawLegend(opts.series, opts, config, context);
                    drawYAxis(series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: function onAnimationFinish() {
                    _this.event.trigger('renderComplete');
                }
            });
            break;
        case 'area':
            this.animationInstance = new Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: function onProcess(process) {
                    drawYAxisGrid(opts, config, context);

                    var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
                        xAxisPoints = _drawAreaDataPoints.xAxisPoints,
                        calPoints = _drawAreaDataPoints.calPoints,
                        eachSpacing = _drawAreaDataPoints.eachSpacing;

                    _this.chartData.xAxisPoints = xAxisPoints;
                    _this.chartData.calPoints = calPoints;
                    _this.chartData.eachSpacing = eachSpacing;
                    drawXAxis(categories, opts, config, context);
                    drawLegend(opts.series, opts, config, context);
                    drawYAxis(series, opts, config, context);
                    drawToolTipBridge(opts, config, context, process);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: function onAnimationFinish() {
                    _this.event.trigger('renderComplete');
                }
            });
            break;
        case 'ring':
        case 'pie':
            this.animationInstance = new Animation({
                timing: 'easeInOut',
                duration: duration,
                onProcess: function onProcess(process) {
                    _this.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: function onAnimationFinish() {
                    _this.event.trigger('renderComplete');
                }
            });
            break;
        case 'radar':
            this.animationInstance = new Animation({
                timing: 'easeInOut',
                duration: duration,
                onProcess: function onProcess(process) {
                    _this.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: function onAnimationFinish() {
                    _this.event.trigger('renderComplete');
                }
            });
            break;
    }
}

// simple event implement

function Event() {
    this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
};

Event.prototype.trigger = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var type = args[0];
    var params = args.slice(1);
    if (!!this.events[type]) {
        this.events[type].forEach(function (listener) {
            try {
                listener.apply(null, params);
            } catch (e) {
                console.error(e);
            }
        });
    }
};

var Charts = function Charts(opts) {
    opts.title = opts.title || {};
    opts.subtitle = opts.subtitle || {};
    opts.yAxis = opts.yAxis || {};
    opts.xAxis = opts.xAxis || {};
    opts.extra = opts.extra || {};
    opts.legend = opts.legend === false ? false : true;
    opts.animation = opts.animation === false ? false : true;
    var config$$1 = assign({}, config);
    config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : config$$1.pieChartLinePadding;
    config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding;

    this.opts = opts;
    this.config = config$$1;
    this.context = wx.createCanvasContext(opts.canvasId);
    // store calcuated chart data
    // such as chart point coordinate
    this.chartData = {};
    this.event = new Event();
    this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0
    };

    drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

Charts.prototype.updateData = function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.opts.series = data.series || this.opts.series;
    this.opts.categories = data.categories || this.opts.categories;

    this.opts.title = assign({}, this.opts.title, data.title || {});
    this.opts.subtitle = assign({}, this.opts.subtitle, data.subtitle || {});

    drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.stopAnimation = function () {
    this.animationInstance && this.animationInstance.stop();
};

Charts.prototype.addEventListener = function (type, listener) {
    this.event.addEventListener(type, listener);
};

Charts.prototype.getCurrentDataIndex = function (e) {
    var touches = e.touches && e.touches.length ? e.touches : e.changedTouches;
    if (touches && touches.length) {
        var _touches$ = touches[0],
            x = _touches$.x,
            y = _touches$.y;

        if (this.opts.type === 'pie' || this.opts.type === 'ring') {
            return findPieChartCurrentIndex({ x: x, y: y }, this.chartData.pieData);
        } else if (this.opts.type === 'radar') {
            return findRadarChartCurrentIndex({ x: x, y: y }, this.chartData.radarData, this.opts.categories.length);
        } else {
            return findCurrentIndex({ x: x, y: y }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
        }
    }
    return -1;
};

Charts.prototype.showToolTip = function (e) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.opts.type === 'line' || this.opts.type === 'area') {
        var index = this.getCurrentDataIndex(e);
        var currentOffset = this.scrollOption.currentOffset;

        var opts = assign({}, this.opts, {
            _scrollDistance_: currentOffset,
            animation: false
        });
        if (index > -1) {
            var seriesData = getSeriesDataItem(this.opts.series, index);
            if (seriesData.length === 0) {
                drawCharts.call(this, opts.type, opts, this.config, this.context);
            } else {
                var _getToolTipData = getToolTipData(seriesData, this.chartData.calPoints, index, this.opts.categories, option),
                    textList = _getToolTipData.textList,
                    offset = _getToolTipData.offset;

                opts.tooltip = {
                    textList: textList,
                    offset: offset,
                    option: option
                };
                drawCharts.call(this, opts.type, opts, this.config, this.context);
            }
        } else {
            drawCharts.call(this, opts.type, opts, this.config, this.context);
        }
    }
};

Charts.prototype.scrollStart = function (e) {
    if (e.touches[0] && this.opts.enableScroll === true) {
        this.scrollOption.startTouchX = e.touches[0].x;
    }
};

Charts.prototype.scroll = function (e) {
    // TODO throtting...
    if (e.touches[0] && this.opts.enableScroll === true) {
        var _distance = e.touches[0].x - this.scrollOption.startTouchX;
        var currentOffset = this.scrollOption.currentOffset;

        var validDistance = calValidDistance(currentOffset + _distance, this.chartData, this.config, this.opts);

        this.scrollOption.distance = _distance = validDistance - currentOffset;
        var opts = assign({}, this.opts, {
            _scrollDistance_: currentOffset + _distance,
            animation: false
        });

        drawCharts.call(this, opts.type, opts, this.config, this.context);
    }
};

Charts.prototype.scrollEnd = function (e) {
    if (this.opts.enableScroll === true) {
        var _scrollOption = this.scrollOption,
            currentOffset = _scrollOption.currentOffset,
            distance = _scrollOption.distance;

        this.scrollOption.currentOffset = currentOffset + distance;
        this.scrollOption.distance = 0;
    }
};

module.exports = Charts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4Y2hhcnRzLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInlBeGlzV2lkdGgiLCJ5QXhpc1NwbGl0IiwieEF4aXNIZWlnaHQiLCJ4QXhpc0xpbmVIZWlnaHQiLCJsZWdlbmRIZWlnaHQiLCJ5QXhpc1RpdGxlV2lkdGgiLCJwYWRkaW5nIiwiY29sdW1lUGFkZGluZyIsImZvbnRTaXplIiwiZGF0YVBvaW50U2hhcGUiLCJjb2xvcnMiLCJwaWVDaGFydExpbmVQYWRkaW5nIiwicGllQ2hhcnRUZXh0UGFkZGluZyIsInhBeGlzVGV4dFBhZGRpbmciLCJ0aXRsZUNvbG9yIiwidGl0bGVGb250U2l6ZSIsInN1YnRpdGxlQ29sb3IiLCJzdWJ0aXRsZUZvbnRTaXplIiwidG9vbFRpcFBhZGRpbmciLCJ0b29sVGlwQmFja2dyb3VuZCIsInRvb2xUaXBPcGFjaXR5IiwidG9vbFRpcExpbmVIZWlnaHQiLCJyYWRhckdyaWRDb3VudCIsInJhZGFyTGFiZWxUZXh0TWFyZ2luIiwiYXNzaWduIiwidGFyZ2V0IiwidmFyQXJncyIsIlR5cGVFcnJvciIsInRvIiwiT2JqZWN0IiwiaW5kZXgiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJuZXh0U291cmNlIiwibmV4dEtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInV0aWwiLCJ0b0ZpeGVkIiwibnVtIiwibGltaXQiLCJpc0Zsb2F0IiwiYXBwcm94aW1hdGVseUVxdWFsIiwibnVtMSIsIm51bTIiLCJNYXRoIiwiYWJzIiwiaXNTYW1lU2lnbiIsImlzU2FtZVhDb29yZGluYXRlQXJlYSIsInAxIiwicDIiLCJ4IiwiaXNDb2xsaXNpb24iLCJvYmoxIiwib2JqMiIsImVuZCIsInN0YXJ0Iiwid2lkdGgiLCJ5IiwiaGVpZ2h0IiwiZmxhZyIsImZpbmRSYW5nZSIsInR5cGUiLCJpc05hTiIsIkVycm9yIiwibXVsdGlwbGUiLCJjZWlsIiwiZmxvb3IiLCJjYWxWYWxpZERpc3RhbmNlIiwiZGlzdGFuY2UiLCJjaGFydERhdGEiLCJvcHRzIiwiZGF0YUNoYXJ0QXJlYVdpZHRoIiwieEF4aXNQb2ludHMiLCJkYXRhQ2hhcnRXaWR0aCIsImVhY2hTcGFjaW5nIiwiY2F0ZWdvcmllcyIsInZhbGlkRGlzdGFuY2UiLCJpc0luQW5nbGVSYW5nZSIsImFuZ2xlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwiYWRqdXN0IiwiUEkiLCJjYWxSb3RhdGVUcmFuc2xhdGUiLCJoIiwieHYiLCJ5diIsInRyYW5zWCIsInNxcnQiLCJ0cmFuc1kiLCJjcmVhdGVDdXJ2ZUNvbnRyb2xQb2ludHMiLCJwb2ludHMiLCJpIiwiaXNOb3RNaWRkbGVQb2ludCIsIm1heCIsIm1pbiIsImEiLCJiIiwicEF4IiwicEF5IiwicEJ4IiwicEJ5IiwibGFzdCIsImN0ckEiLCJjdHJCIiwiY29udmVydENvb3JkaW5hdGVPcmlnaW4iLCJjZW50ZXIiLCJhdm9pZENvbGxpc2lvbiIsIm9iaiIsImZpbGxTZXJpZXNDb2xvciIsInNlcmllcyIsIm1hcCIsIml0ZW0iLCJjb2xvciIsImdldERhdGFSYW5nZSIsIm1pbkRhdGEiLCJtYXhEYXRhIiwicmFuZ2UiLCJtaW5SYW5nZSIsIm1heFJhbmdlIiwibWVhc3VyZVRleHQiLCJ0ZXh0IiwidW5kZWZpbmVkIiwiU3RyaW5nIiwic3BsaXQiLCJmb3JFYWNoIiwidGVzdCIsImRhdGFDb21iaW5lIiwicmVkdWNlIiwiZGF0YSIsImNvbmNhdCIsImdldFNlcmllc0RhdGFJdGVtIiwic2VyaWVzSXRlbSIsIm5hbWUiLCJmb3JtYXQiLCJwdXNoIiwiZ2V0TWF4VGV4dExpc3RMZW5ndGgiLCJsaXN0IiwibGVuZ3RoTGlzdCIsImFwcGx5IiwiZ2V0UmFkYXJDb29yZGluYXRlU2VyaWVzIiwiZWFjaEFuZ2xlIiwiQ29vcmRpbmF0ZVNlcmllcyIsImdldFRvb2xUaXBEYXRhIiwic2VyaWVzRGF0YSIsImNhbFBvaW50cyIsIm9wdGlvbiIsInRleHRMaXN0IiwidmFsaWRDYWxQb2ludHMiLCJvZmZzZXQiLCJyb3VuZCIsImZpbmRDdXJyZW50SW5kZXgiLCJjdXJyZW50UG9pbnRzIiwiY3VycmVudEluZGV4IiwiaXNJbkV4YWN0Q2hhcnRBcmVhIiwiZmluZFJhZGFyQ2hhcnRDdXJyZW50SW5kZXgiLCJyYWRhckRhdGEiLCJjb3VudCIsImVhY2hBbmdsZUFyZWEiLCJpc0luRXhhY3RQaWVDaGFydEFyZWEiLCJyYWRpdXMiLCJmaXhBbmdsZSIsImF0YW4yIiwiYW5nbGVMaXN0IiwicmFuZ2VTdGFydCIsInJhbmdlRW5kIiwiZmluZFBpZUNoYXJ0Q3VycmVudEluZGV4IiwicGllRGF0YSIsImxlbiIsIl9zdGFydF8iLCJfcHJvcG9ydGlvbl8iLCJwb3ciLCJzcGxpdFBvaW50cyIsIm5ld1BvaW50cyIsIml0ZW1zIiwiY2FsTGVnZW5kRGF0YSIsImxlZ2VuZCIsImxlZ2VuZExpc3QiLCJtYXJnaW5Ub3AiLCJzaGFwZVdpZHRoIiwid2lkdGhDb3VudCIsImN1cnJlbnRSb3ciLCJpdGVtV2lkdGgiLCJjYWxDYXRlZ29yaWVzRGF0YSIsInJlc3VsdCIsIl9nZXRYQXhpc1BvaW50cyIsImdldFhBeGlzUG9pbnRzIiwiY2F0ZWdvcmllc1RleHRMZW50aCIsIm1heFRleHRMZW5ndGgiLCJzaW4iLCJnZXRSYWRhckRhdGFQb2ludHMiLCJwcm9jZXNzIiwicmFkYXJPcHRpb24iLCJleHRyYSIsInJhZGFyIiwiZWFjaCIsImxpc3RJdGVtIiwidG1wIiwicHJvcG9ydGlvbiIsInBvc2l0aW9uIiwiY29zIiwiZ2V0UGllRGF0YVBvaW50cyIsImdldFBpZVRleHRNYXhMZW5ndGgiLCJtYXhMZW5ndGgiLCJmaXhDb2x1bWVEYXRhIiwiY29sdW1uTGVuIiwiY29sdW1uIiwieUF4aXNUb3RhbFdpZHRoIiwic3BhY2luZ1ZhbGlkIiwiZGF0YUNvdW50IiwiZW5hYmxlU2Nyb2xsIiwic3RhcnRYIiwiZW5kWCIsImdldERhdGFQb2ludHMiLCJ2YWxpZEhlaWdodCIsInBvaW50IiwiZ2V0WUF4aXNUZXh0TGlzdCIsImZpbHRlciIsInlBeGlzIiwicmFuZ2VTcGFuIiwiZGF0YVJhbmdlIiwiZWFjaFJhbmdlIiwicmV2ZXJzZSIsImNhbFlBeGlzRGF0YSIsInJhbmdlcyIsInJhbmdlc0Zvcm1hdCIsIk51bWJlciIsImRpc2FibGVkIiwiZHJhd1BvaW50U2hhcGUiLCJzaGFwZSIsImNvbnRleHQiLCJiZWdpblBhdGgiLCJzZXRTdHJva2VTdHlsZSIsInNldExpbmVXaWR0aCIsInNldEZpbGxTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsImFyYyIsInJlY3QiLCJjbG9zZVBhdGgiLCJmaWxsIiwic3Ryb2tlIiwiZHJhd1JpbmdUaXRsZSIsInRpdGxlZm9udFNpemUiLCJ0aXRsZSIsInN1YnRpdGxlZm9udFNpemUiLCJzdWJ0aXRsZSIsInRpdGxlRm9udENvbG9yIiwic3VidGl0bGVGb250Q29sb3IiLCJ0aXRsZUhlaWdodCIsInN1YnRpdGxlSGVpZ2h0IiwibWFyZ2luIiwidGV4dFdpZHRoIiwib2Zmc2V0WCIsInN0YXJ0WSIsInNldEZvbnRTaXplIiwiZmlsbFRleHQiLCJfdGV4dFdpZHRoIiwiX3N0YXJ0WCIsIl9zdGFydFkiLCJkcmF3UG9pbnRUZXh0IiwiZm9ybWF0VmFsIiwiZHJhd1JhZGFyTGFiZWwiLCJjZW50ZXJQb3NpdGlvbiIsImxhYmVsQ29sb3IiLCJwb3MiLCJwb3NSZWxhdGl2ZUNhbnZhcyIsImRyYXdQaWVUZXh0IiwibGluZVJhZGl1cyIsInRleHRPYmplY3RDb2xsZWN0aW9uIiwibGFzdFRleHRPYmplY3QiLCJzZXJpZXNDb252ZXJ0Iiwib3JnaW5YMSIsIm9yZ2luWTEiLCJvcmdpblgyIiwib3JnaW5ZMiIsIm9yZ2luWDMiLCJvcmdpblkzIiwidGV4dE9iamVjdCIsImxpbmVTdGFydCIsImxpbmVFbmQiLCJsaW5lU3RhcnRQb2lzdGlvbiIsImxpbmVFbmRQb2lzdGlvbiIsInRleHRQb3NpdGlvbiIsImN1cnZlU3RhcnRYIiwidGV4dFN0YXJ0WCIsInF1YWRyYXRpY0N1cnZlVG8iLCJkcmF3VG9vbFRpcFNwbGl0TGluZSIsImVuZFkiLCJkcmF3VG9vbFRpcCIsImxlZ2VuZFdpZHRoIiwibGVnZW5kTWFyZ2luUmlnaHQiLCJhcnJvd1dpZHRoIiwiaXNPdmVyUmlnaHRCb3JkZXIiLCJ0b29sVGlwV2lkdGgiLCJ0b29sVGlwSGVpZ2h0IiwiX3Njcm9sbERpc3RhbmNlXyIsInRvb2x0aXAiLCJiYWNrZ3JvdW5kIiwic2V0R2xvYmFsQWxwaGEiLCJmaWxsUmVjdCIsImRyYXdZQXhpc1RpdGxlIiwic2F2ZSIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsInJlc3RvcmUiLCJkcmF3Q29sdW1uRGF0YVBvaW50cyIsIl9jYWxZQXhpc0RhdGEiLCJwb3AiLCJzaGlmdCIsImVhY2hTZXJpZXMiLCJzZXJpZXNJbmRleCIsImRhdGFMYWJlbCIsImRyYXdBcmVhRGF0YVBvaW50cyIsIl9jYWxZQXhpc0RhdGEyIiwiX2dldFhBeGlzUG9pbnRzMiIsInNwbGl0UG9pbnRMaXN0IiwiZmlyc3RQb2ludCIsImxhc3RQb2ludCIsImxpbmVTdHlsZSIsImN0cmxQb2ludCIsImJlemllckN1cnZlVG8iLCJkcmF3TGluZURhdGFQb2ludHMiLCJfY2FsWUF4aXNEYXRhMyIsIl9nZXRYQXhpc1BvaW50czMiLCJkcmF3VG9vbFRpcEJyaWRnZSIsImRyYXdYQXhpcyIsIl9nZXRYQXhpc1BvaW50czQiLCJ4QXhpcyIsImdyaWRDb2xvciIsImRpc2FibGVHcmlkIiwidmFsaWRXaWR0aCIsIm1heFhBeGlzTGlzdExlbmd0aCIsInJhdGlvIiwiX3hBeGlzVGV4dEFuZ2xlXyIsImZvbnRDb2xvciIsIl9jYWxSb3RhdGVUcmFuc2xhdGUiLCJkcmF3WUF4aXNHcmlkIiwiZHJhd1lBeGlzIiwiX2NhbFlBeGlzRGF0YTQiLCJkcmF3TGVnZW5kIiwiX2NhbExlZ2VuZERhdGEiLCJpdGVtTGlzdCIsImxpc3RJbmRleCIsImxlZ2VuZFRleHRDb2xvciIsImRyYXdQaWVEYXRhUG9pbnRzIiwicGllT3B0aW9uIiwicGllIiwiX3BpZVRleHRNYXhMZW5ndGhfIiwib2Zmc2V0QW5nbGUiLCJkaXNhYmxlUGllU3Ryb2tlIiwiaW5uZXJQaWVXaWR0aCIsInJpbmdXaWR0aCIsInZhbGlkIiwiZHJhd1JhZGFyRGF0YVBvaW50cyIsImNvb3JkaW5hdGVBbmdsZSIsIl9sb29wIiwic3RhcnRQb3MiLCJyYWRhckRhdGFQb2ludHMiLCJkcmF3Q2FudmFzIiwiZHJhdyIsIlRpbWluZyIsImVhc2VJbiIsImVhc2VPdXQiLCJlYXNlSW5PdXQiLCJsaW5lYXIiLCJBbmltYXRpb24iLCJpc1N0b3AiLCJkdXJhdGlvbiIsInRpbWluZyIsImRlbGF5IiwiY3JlYXRlQW5pbWF0aW9uRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZXRUaW1lb3V0Iiwic3RlcCIsInRpbWVTdGFtcCIsIkRhdGUiLCJhbmltYXRpb25GcmFtZSIsInN0YXJ0VGltZVN0YW1wIiwiX3N0ZXAiLCJ0aW1lc3RhbXAiLCJvblByb2Nlc3MiLCJvbkFuaW1hdGlvbkZpbmlzaCIsInRpbWluZ0Z1bmN0aW9uIiwiYmluZCIsInN0b3AiLCJkcmF3Q2hhcnRzIiwiX3RoaXMiLCJfY2FsQ2F0ZWdvcmllc0RhdGEiLCJhbmltYXRpb24iLCJhbmltYXRpb25JbnN0YW5jZSIsIl9kcmF3TGluZURhdGFQb2ludHMiLCJldmVudCIsInRyaWdnZXIiLCJfZHJhd0NvbHVtbkRhdGFQb2ludHMiLCJfZHJhd0FyZWFEYXRhUG9pbnRzIiwiRXZlbnQiLCJldmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwibGlzdGVuZXIiLCJfbGVuIiwiYXJncyIsIkFycmF5IiwiX2tleSIsInBhcmFtcyIsInNsaWNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsIkNoYXJ0cyIsImNvbmZpZyQkMSIsInd4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImNhbnZhc0lkIiwic2Nyb2xsT3B0aW9uIiwiY3VycmVudE9mZnNldCIsInN0YXJ0VG91Y2hYIiwidXBkYXRlRGF0YSIsInN0b3BBbmltYXRpb24iLCJnZXRDdXJyZW50RGF0YUluZGV4IiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiX3RvdWNoZXMkIiwic2hvd1Rvb2xUaXAiLCJfZ2V0VG9vbFRpcERhdGEiLCJzY3JvbGxTdGFydCIsInNjcm9sbCIsIl9kaXN0YW5jZSIsInNjcm9sbEVuZCIsIl9zY3JvbGxPcHRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBU0E7O0FBRUEsSUFBSUEsU0FBUztBQUNUQyxnQkFBWSxFQURIO0FBRVRDLGdCQUFZLENBRkg7QUFHVEMsaUJBQWEsRUFISjtBQUlUQyxxQkFBaUIsRUFKUjtBQUtUQyxrQkFBYyxFQUxMO0FBTVRDLHFCQUFpQixFQU5SO0FBT1RDLGFBQVMsRUFQQTtBQVFUQyxtQkFBZSxDQVJOO0FBU1RDLGNBQVUsRUFURDtBQVVUQyxvQkFBZ0IsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixVQUF0QixFQUFrQyxNQUFsQyxDQVZQO0FBV1RDLFlBQVEsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxDQVhDO0FBWVRDLHlCQUFxQixFQVpaO0FBYVRDLHlCQUFxQixFQWJaO0FBY1RDLHNCQUFrQixDQWRUO0FBZVRDLGdCQUFZLFNBZkg7QUFnQlRDLG1CQUFlLEVBaEJOO0FBaUJUQyxtQkFBZSxTQWpCTjtBQWtCVEMsc0JBQWtCLEVBbEJUO0FBbUJUQyxvQkFBZ0IsQ0FuQlA7QUFvQlRDLHVCQUFtQixTQXBCVjtBQXFCVEMsb0JBQWdCLEdBckJQO0FBc0JUQyx1QkFBbUIsRUF0QlY7QUF1QlRDLG9CQUFnQixDQXZCUDtBQXdCVEMsMEJBQXNCO0FBeEJiLENBQWI7O0FBMkJBO0FBQ0E7QUFDQSxTQUFTQyxNQUFULENBQWdCQyxNQUFoQixFQUF3QkMsT0FBeEIsRUFBaUM7QUFDN0IsUUFBSUQsVUFBVSxJQUFkLEVBQW9CO0FBQ2hCO0FBQ0EsY0FBTSxJQUFJRSxTQUFKLENBQWMsNENBQWQsQ0FBTjtBQUNIOztBQUVELFFBQUlDLEtBQUtDLE9BQU9KLE1BQVAsQ0FBVDs7QUFFQSxT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Q0EsZ0JBQWdCM1YsUUFBbEQ7QUFDQSxhQUFLMFYsWUFBTCxDQUFrQjFWLFFBQWxCLEdBQTZCLENBQTdCO0FBQ0g7QUFDSixDQVREOztBQVdBMFcsT0FBT0MsT0FBUCxHQUFpQnRCLE1BQWpCIiwiZmlsZSI6Ind4Y2hhcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIGNoYXJ0cyBmb3IgV2VDaGF0IHNtYWxsIGFwcCB2MS4wXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3hpYW9saW4zMzAzL3d4LWNoYXJ0c1xuICogMjAxNi0xMS0yOFxuICpcbiAqIERlc2lnbmVkIGFuZCBidWlsdCB3aXRoIGFsbCB0aGUgbG92ZSBvZiBXZWJcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb25maWcgPSB7XG4gICAgeUF4aXNXaWR0aDogMTUsXG4gICAgeUF4aXNTcGxpdDogNSxcbiAgICB4QXhpc0hlaWdodDogMTUsXG4gICAgeEF4aXNMaW5lSGVpZ2h0OiAxNSxcbiAgICBsZWdlbmRIZWlnaHQ6IDE1LFxuICAgIHlBeGlzVGl0bGVXaWR0aDogMTUsXG4gICAgcGFkZGluZzogMTIsXG4gICAgY29sdW1lUGFkZGluZzogMyxcbiAgICBmb250U2l6ZTogMTAsXG4gICAgZGF0YVBvaW50U2hhcGU6IFsnZGlhbW9uZCcsICdjaXJjbGUnLCAndHJpYW5nbGUnLCAncmVjdCddLFxuICAgIGNvbG9yczogWycjN2NiNWVjJywgJyNmN2EzNWMnLCAnIzQzNDM0OCcsICcjOTBlZDdkJywgJyNmMTVjODAnLCAnIzgwODVlOSddLFxuICAgIHBpZUNoYXJ0TGluZVBhZGRpbmc6IDI1LFxuICAgIHBpZUNoYXJ0VGV4dFBhZGRpbmc6IDE1LFxuICAgIHhBeGlzVGV4dFBhZGRpbmc6IDMsXG4gICAgdGl0bGVDb2xvcjogJyMzMzMzMzMnLFxuICAgIHRpdGxlRm9udFNpemU6IDIwLFxuICAgIHN1YnRpdGxlQ29sb3I6ICcjOTk5OTk5JyxcbiAgICBzdWJ0aXRsZUZvbnRTaXplOiAxNSxcbiAgICB0b29sVGlwUGFkZGluZzogMyxcbiAgICB0b29sVGlwQmFja2dyb3VuZDogJyMwMDAwMDAnLFxuICAgIHRvb2xUaXBPcGFjaXR5OiAwLjcsXG4gICAgdG9vbFRpcExpbmVIZWlnaHQ6IDE0LFxuICAgIHJhZGFyR3JpZENvdW50OiAzLFxuICAgIHJhZGFyTGFiZWxUZXh0TWFyZ2luOiAxNVxufTtcblxuLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZmlsbFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgdmFyQXJncykge1xuICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgICAvLyBUeXBlRXJyb3IgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG5cbiAgICAgICAgaWYgKG5leHRTb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvO1xufVxuXG52YXIgdXRpbCA9IHtcbiAgICB0b0ZpeGVkOiBmdW5jdGlvbiB0b0ZpeGVkKG51bSwgbGltaXQpIHtcbiAgICAgICAgbGltaXQgPSBsaW1pdCB8fCAyO1xuICAgICAgICBpZiAodGhpcy5pc0Zsb2F0KG51bSkpIHtcbiAgICAgICAgICAgIG51bSA9IG51bS50b0ZpeGVkKGxpbWl0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH0sXG4gICAgaXNGbG9hdDogZnVuY3Rpb24gaXNGbG9hdChudW0pIHtcbiAgICAgICAgcmV0dXJuIG51bSAlIDEgIT09IDA7XG4gICAgfSxcbiAgICBhcHByb3hpbWF0ZWx5RXF1YWw6IGZ1bmN0aW9uIGFwcHJveGltYXRlbHlFcXVhbChudW0xLCBudW0yKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhudW0xIC0gbnVtMikgPCAxZS0xMDtcbiAgICB9LFxuICAgIGlzU2FtZVNpZ246IGZ1bmN0aW9uIGlzU2FtZVNpZ24obnVtMSwgbnVtMikge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnMobnVtMSkgPT09IG51bTEgJiYgTWF0aC5hYnMobnVtMikgPT09IG51bTIgfHwgTWF0aC5hYnMobnVtMSkgIT09IG51bTEgJiYgTWF0aC5hYnMobnVtMikgIT09IG51bTI7XG4gICAgfSxcbiAgICBpc1NhbWVYQ29vcmRpbmF0ZUFyZWE6IGZ1bmN0aW9uIGlzU2FtZVhDb29yZGluYXRlQXJlYShwMSwgcDIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lU2lnbihwMS54LCBwMi54KTtcbiAgICB9LFxuICAgIGlzQ29sbGlzaW9uOiBmdW5jdGlvbiBpc0NvbGxpc2lvbihvYmoxLCBvYmoyKSB7XG4gICAgICAgIG9iajEuZW5kID0ge307XG4gICAgICAgIG9iajEuZW5kLnggPSBvYmoxLnN0YXJ0LnggKyBvYmoxLndpZHRoO1xuICAgICAgICBvYmoxLmVuZC55ID0gb2JqMS5zdGFydC55IC0gb2JqMS5oZWlnaHQ7XG4gICAgICAgIG9iajIuZW5kID0ge307XG4gICAgICAgIG9iajIuZW5kLnggPSBvYmoyLnN0YXJ0LnggKyBvYmoyLndpZHRoO1xuICAgICAgICBvYmoyLmVuZC55ID0gb2JqMi5zdGFydC55IC0gb2JqMi5oZWlnaHQ7XG4gICAgICAgIHZhciBmbGFnID0gb2JqMi5zdGFydC54ID4gb2JqMS5lbmQueCB8fCBvYmoyLmVuZC54IDwgb2JqMS5zdGFydC54IHx8IG9iajIuZW5kLnkgPiBvYmoxLnN0YXJ0LnkgfHwgb2JqMi5zdGFydC55IDwgb2JqMS5lbmQueTtcblxuICAgICAgICByZXR1cm4gIWZsYWc7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZmluZFJhbmdlKG51bSwgdHlwZSwgbGltaXQpIHtcbiAgICBpZiAoaXNOYU4obnVtKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1t3eENoYXJ0c10gdW52YWxpZCBzZXJpZXMgZGF0YSEnKTtcbiAgICB9XG4gICAgbGltaXQgPSBsaW1pdCB8fCAxMDtcbiAgICB0eXBlID0gdHlwZSA/IHR5cGUgOiAndXBwZXInO1xuICAgIHZhciBtdWx0aXBsZSA9IDE7XG4gICAgd2hpbGUgKGxpbWl0IDwgMSkge1xuICAgICAgICBsaW1pdCAqPSAxMDtcbiAgICAgICAgbXVsdGlwbGUgKj0gMTA7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAndXBwZXInKSB7XG4gICAgICAgIG51bSA9IE1hdGguY2VpbChudW0gKiBtdWx0aXBsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbnVtID0gTWF0aC5mbG9vcihudW0gKiBtdWx0aXBsZSk7XG4gICAgfVxuICAgIHdoaWxlIChudW0gJSBsaW1pdCAhPT0gMCkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3VwcGVyJykge1xuICAgICAgICAgICAgbnVtKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0tLTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudW0gLyBtdWx0aXBsZTtcbn1cblxuZnVuY3Rpb24gY2FsVmFsaWREaXN0YW5jZShkaXN0YW5jZSwgY2hhcnREYXRhLCBjb25maWcsIG9wdHMpIHtcblxuICAgIHZhciBkYXRhQ2hhcnRBcmVhV2lkdGggPSBvcHRzLndpZHRoIC0gY29uZmlnLnBhZGRpbmcgLSBjaGFydERhdGEueEF4aXNQb2ludHNbMF07XG4gICAgdmFyIGRhdGFDaGFydFdpZHRoID0gY2hhcnREYXRhLmVhY2hTcGFjaW5nICogb3B0cy5jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICB2YXIgdmFsaWREaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgIGlmIChkaXN0YW5jZSA+PSAwKSB7XG4gICAgICAgIHZhbGlkRGlzdGFuY2UgPSAwO1xuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpID49IGRhdGFDaGFydFdpZHRoIC0gZGF0YUNoYXJ0QXJlYVdpZHRoKSB7XG4gICAgICAgIHZhbGlkRGlzdGFuY2UgPSBkYXRhQ2hhcnRBcmVhV2lkdGggLSBkYXRhQ2hhcnRXaWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkRGlzdGFuY2U7XG59XG5cbmZ1bmN0aW9uIGlzSW5BbmdsZVJhbmdlKGFuZ2xlLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSkge1xuICAgIGZ1bmN0aW9uIGFkanVzdChhbmdsZSkge1xuICAgICAgICB3aGlsZSAoYW5nbGUgPCAwKSB7XG4gICAgICAgICAgICBhbmdsZSArPSAyICogTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoYW5nbGUgPiAyICogTWF0aC5QSSkge1xuICAgICAgICAgICAgYW5nbGUgLT0gMiAqIE1hdGguUEk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxuXG4gICAgYW5nbGUgPSBhZGp1c3QoYW5nbGUpO1xuICAgIHN0YXJ0QW5nbGUgPSBhZGp1c3Qoc3RhcnRBbmdsZSk7XG4gICAgZW5kQW5nbGUgPSBhZGp1c3QoZW5kQW5nbGUpO1xuICAgIGlmIChzdGFydEFuZ2xlID4gZW5kQW5nbGUpIHtcbiAgICAgICAgZW5kQW5nbGUgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChhbmdsZSA8IHN0YXJ0QW5nbGUpIHtcbiAgICAgICAgICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuZ2xlID49IHN0YXJ0QW5nbGUgJiYgYW5nbGUgPD0gZW5kQW5nbGU7XG59XG5cbmZ1bmN0aW9uIGNhbFJvdGF0ZVRyYW5zbGF0ZSh4LCB5LCBoKSB7XG4gICAgdmFyIHh2ID0geDtcbiAgICB2YXIgeXYgPSBoIC0geTtcblxuICAgIHZhciB0cmFuc1ggPSB4diArIChoIC0geXYgLSB4dikgLyBNYXRoLnNxcnQoMik7XG4gICAgdHJhbnNYICo9IC0xO1xuXG4gICAgdmFyIHRyYW5zWSA9IChoIC0geXYpICogKE1hdGguc3FydCgyKSAtIDEpIC0gKGggLSB5diAtIHh2KSAvIE1hdGguc3FydCgyKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zWDogdHJhbnNYLFxuICAgICAgICB0cmFuc1k6IHRyYW5zWVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUN1cnZlQ29udHJvbFBvaW50cyhwb2ludHMsIGkpIHtcblxuICAgIGZ1bmN0aW9uIGlzTm90TWlkZGxlUG9pbnQocG9pbnRzLCBpKSB7XG4gICAgICAgIGlmIChwb2ludHNbaSAtIDFdICYmIHBvaW50c1tpICsgMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBwb2ludHNbaV0ueSA+PSBNYXRoLm1heChwb2ludHNbaSAtIDFdLnksIHBvaW50c1tpICsgMV0ueSkgfHwgcG9pbnRzW2ldLnkgPD0gTWF0aC5taW4ocG9pbnRzW2kgLSAxXS55LCBwb2ludHNbaSArIDFdLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGEgPSAwLjI7XG4gICAgdmFyIGIgPSAwLjI7XG4gICAgdmFyIHBBeCA9IG51bGw7XG4gICAgdmFyIHBBeSA9IG51bGw7XG4gICAgdmFyIHBCeCA9IG51bGw7XG4gICAgdmFyIHBCeSA9IG51bGw7XG4gICAgaWYgKGkgPCAxKSB7XG4gICAgICAgIHBBeCA9IHBvaW50c1swXS54ICsgKHBvaW50c1sxXS54IC0gcG9pbnRzWzBdLngpICogYTtcbiAgICAgICAgcEF5ID0gcG9pbnRzWzBdLnkgKyAocG9pbnRzWzFdLnkgLSBwb2ludHNbMF0ueSkgKiBhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBBeCA9IHBvaW50c1tpXS54ICsgKHBvaW50c1tpICsgMV0ueCAtIHBvaW50c1tpIC0gMV0ueCkgKiBhO1xuICAgICAgICBwQXkgPSBwb2ludHNbaV0ueSArIChwb2ludHNbaSArIDFdLnkgLSBwb2ludHNbaSAtIDFdLnkpICogYTtcbiAgICB9XG5cbiAgICBpZiAoaSA+IHBvaW50cy5sZW5ndGggLSAzKSB7XG4gICAgICAgIHZhciBsYXN0ID0gcG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgIHBCeCA9IHBvaW50c1tsYXN0XS54IC0gKHBvaW50c1tsYXN0XS54IC0gcG9pbnRzW2xhc3QgLSAxXS54KSAqIGI7XG4gICAgICAgIHBCeSA9IHBvaW50c1tsYXN0XS55IC0gKHBvaW50c1tsYXN0XS55IC0gcG9pbnRzW2xhc3QgLSAxXS55KSAqIGI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcEJ4ID0gcG9pbnRzW2kgKyAxXS54IC0gKHBvaW50c1tpICsgMl0ueCAtIHBvaW50c1tpXS54KSAqIGI7XG4gICAgICAgIHBCeSA9IHBvaW50c1tpICsgMV0ueSAtIChwb2ludHNbaSArIDJdLnkgLSBwb2ludHNbaV0ueSkgKiBiO1xuICAgIH1cblxuICAgIC8vIGZpeCBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20veGlhb2xpbjMzMDMvd3gtY2hhcnRzL2lzc3Vlcy83OVxuICAgIGlmIChpc05vdE1pZGRsZVBvaW50KHBvaW50cywgaSArIDEpKSB7XG4gICAgICAgIHBCeSA9IHBvaW50c1tpICsgMV0ueTtcbiAgICB9XG4gICAgaWYgKGlzTm90TWlkZGxlUG9pbnQocG9pbnRzLCBpKSkge1xuICAgICAgICBwQXkgPSBwb2ludHNbaV0ueTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjdHJBOiB7IHg6IHBBeCwgeTogcEF5IH0sXG4gICAgICAgIGN0ckI6IHsgeDogcEJ4LCB5OiBwQnkgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRDb29yZGluYXRlT3JpZ2luKHgsIHksIGNlbnRlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IGNlbnRlci54ICsgeCxcbiAgICAgICAgeTogY2VudGVyLnkgLSB5XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXZvaWRDb2xsaXNpb24ob2JqLCB0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIC8vIGlzIGNvbGxpc2lvbiB0ZXN0XG4gICAgICAgIHdoaWxlICh1dGlsLmlzQ29sbGlzaW9uKG9iaiwgdGFyZ2V0KSkge1xuICAgICAgICAgICAgaWYgKG9iai5zdGFydC54ID4gMCkge1xuICAgICAgICAgICAgICAgIG9iai5zdGFydC55LS07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iai5zdGFydC54IDwgMCkge1xuICAgICAgICAgICAgICAgIG9iai5zdGFydC55Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvYmouc3RhcnQueSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnN0YXJ0LnkrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmouc3RhcnQueS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBmaWxsU2VyaWVzQ29sb3Ioc2VyaWVzLCBjb25maWcpIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHJldHVybiBzZXJpZXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbS5jb2xvcikge1xuICAgICAgICAgICAgaXRlbS5jb2xvciA9IGNvbmZpZy5jb2xvcnNbaW5kZXhdO1xuICAgICAgICAgICAgaW5kZXggPSAoaW5kZXggKyAxKSAlIGNvbmZpZy5jb2xvcnMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXREYXRhUmFuZ2UobWluRGF0YSwgbWF4RGF0YSkge1xuICAgIHZhciBsaW1pdCA9IDA7XG4gICAgdmFyIHJhbmdlID0gbWF4RGF0YSAtIG1pbkRhdGE7XG4gICAgaWYgKHJhbmdlID49IDEwMDAwKSB7XG4gICAgICAgIGxpbWl0ID0gMTAwMDtcbiAgICB9IGVsc2UgaWYgKHJhbmdlID49IDEwMDApIHtcbiAgICAgICAgbGltaXQgPSAxMDA7XG4gICAgfSBlbHNlIGlmIChyYW5nZSA+PSAxMDApIHtcbiAgICAgICAgbGltaXQgPSAxMDtcbiAgICB9IGVsc2UgaWYgKHJhbmdlID49IDEwKSB7XG4gICAgICAgIGxpbWl0ID0gNTtcbiAgICB9IGVsc2UgaWYgKHJhbmdlID49IDEpIHtcbiAgICAgICAgbGltaXQgPSAxO1xuICAgIH0gZWxzZSBpZiAocmFuZ2UgPj0gMC4xKSB7XG4gICAgICAgIGxpbWl0ID0gMC4xO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbWl0ID0gMC4wMTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWluUmFuZ2U6IGZpbmRSYW5nZShtaW5EYXRhLCAnbG93ZXInLCBsaW1pdCksXG4gICAgICAgIG1heFJhbmdlOiBmaW5kUmFuZ2UobWF4RGF0YSwgJ3VwcGVyJywgbGltaXQpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gbWVhc3VyZVRleHQodGV4dCkge1xuICAgIHZhciBmb250U2l6ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMTA7XG5cbiAgICAvLyB3eCBjYW52YXMg5pyq5a6e546wbWVhc3VyZVRleHTmlrnms5UsIOatpOWkhOiHquihjOWunueOsFxuICAgIHRleHQgPSBTdHJpbmcodGV4dCk7XG4gICAgdmFyIHRleHQgPSB0ZXh0LnNwbGl0KCcnKTtcbiAgICB2YXIgd2lkdGggPSAwO1xuICAgIHRleHQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoL1thLXpBLVpdLy50ZXN0KGl0ZW0pKSB7XG4gICAgICAgICAgICB3aWR0aCArPSA3O1xuICAgICAgICB9IGVsc2UgaWYgKC9bMC05XS8udGVzdChpdGVtKSkge1xuICAgICAgICAgICAgd2lkdGggKz0gNS41O1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC4vLnRlc3QoaXRlbSkpIHtcbiAgICAgICAgICAgIHdpZHRoICs9IDIuNztcbiAgICAgICAgfSBlbHNlIGlmICgvLS8udGVzdChpdGVtKSkge1xuICAgICAgICAgICAgd2lkdGggKz0gMy4yNTtcbiAgICAgICAgfSBlbHNlIGlmICgvW1xcdTRlMDAtXFx1OWZhNV0vLnRlc3QoaXRlbSkpIHtcbiAgICAgICAgICAgIHdpZHRoICs9IDEwO1xuICAgICAgICB9IGVsc2UgaWYgKC9cXCh8XFwpLy50ZXN0KGl0ZW0pKSB7XG4gICAgICAgICAgICB3aWR0aCArPSAzLjczO1xuICAgICAgICB9IGVsc2UgaWYgKC9cXHMvLnRlc3QoaXRlbSkpIHtcbiAgICAgICAgICAgIHdpZHRoICs9IDIuNTtcbiAgICAgICAgfSBlbHNlIGlmICgvJS8udGVzdChpdGVtKSkge1xuICAgICAgICAgICAgd2lkdGggKz0gODtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZHRoICs9IDEwO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHdpZHRoICogZm9udFNpemUgLyAxMDtcbn1cblxuZnVuY3Rpb24gZGF0YUNvbWJpbmUoc2VyaWVzKSB7XG4gICAgcmV0dXJuIHNlcmllcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhLmRhdGEgPyBhLmRhdGEgOiBhKS5jb25jYXQoYi5kYXRhKTtcbiAgICB9LCBbXSk7XG59XG5cbmZ1bmN0aW9uIGdldFNlcmllc0RhdGFJdGVtKHNlcmllcywgaW5kZXgpIHtcbiAgICB2YXIgZGF0YSA9IFtdO1xuICAgIHNlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLmRhdGFbaW5kZXhdICE9PSBudWxsICYmIHR5cGVvZiBpdGVtLmRhdGFbaW5kZXhdICE9PSAndW5kZWZpbmRlZCcpIHtcbiAgICAgICAgICAgIHZhciBzZXJpZXNJdGVtID0ge307XG4gICAgICAgICAgICBzZXJpZXNJdGVtLmNvbG9yID0gaXRlbS5jb2xvcjtcbiAgICAgICAgICAgIHNlcmllc0l0ZW0ubmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICAgIHNlcmllc0l0ZW0uZGF0YSA9IGl0ZW0uZm9ybWF0ID8gaXRlbS5mb3JtYXQoaXRlbS5kYXRhW2luZGV4XSkgOiBpdGVtLmRhdGFbaW5kZXhdO1xuICAgICAgICAgICAgZGF0YS5wdXNoKHNlcmllc0l0ZW0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbn1cblxuXG5cbmZ1bmN0aW9uIGdldE1heFRleHRMaXN0TGVuZ3RoKGxpc3QpIHtcbiAgICB2YXIgbGVuZ3RoTGlzdCA9IGxpc3QubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBtZWFzdXJlVGV4dChpdGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgbGVuZ3RoTGlzdCk7XG59XG5cbmZ1bmN0aW9uIGdldFJhZGFyQ29vcmRpbmF0ZVNlcmllcyhsZW5ndGgpIHtcbiAgICB2YXIgZWFjaEFuZ2xlID0gMiAqIE1hdGguUEkgLyBsZW5ndGg7XG4gICAgdmFyIENvb3JkaW5hdGVTZXJpZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvb3JkaW5hdGVTZXJpZXMucHVzaChlYWNoQW5nbGUgKiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQ29vcmRpbmF0ZVNlcmllcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIC0xICogaXRlbSArIE1hdGguUEkgLyAyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRUb29sVGlwRGF0YShzZXJpZXNEYXRhLCBjYWxQb2ludHMsIGluZGV4LCBjYXRlZ29yaWVzKSB7XG4gICAgdmFyIG9wdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDoge307XG5cbiAgICB2YXIgdGV4dExpc3QgPSBzZXJpZXNEYXRhLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGV4dDogb3B0aW9uLmZvcm1hdCA/IG9wdGlvbi5mb3JtYXQoaXRlbSwgY2F0ZWdvcmllc1tpbmRleF0pIDogaXRlbS5uYW1lICsgJzogJyArIGl0ZW0uZGF0YSxcbiAgICAgICAgICAgIGNvbG9yOiBpdGVtLmNvbG9yXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIHZhbGlkQ2FsUG9pbnRzID0gW107XG4gICAgdmFyIG9mZnNldCA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgIH07XG4gICAgY2FsUG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50cykge1xuICAgICAgICBpZiAodHlwZW9mIHBvaW50c1tpbmRleF0gIT09ICd1bmRlZmluZGVkJyAmJiBwb2ludHNbaW5kZXhdICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YWxpZENhbFBvaW50cy5wdXNoKHBvaW50c1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFsaWRDYWxQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBvZmZzZXQueCA9IE1hdGgucm91bmQoaXRlbS54KTtcbiAgICAgICAgb2Zmc2V0LnkgKz0gaXRlbS55O1xuICAgIH0pO1xuXG4gICAgb2Zmc2V0LnkgLz0gdmFsaWRDYWxQb2ludHMubGVuZ3RoO1xuICAgIHJldHVybiB7IHRleHRMaXN0OiB0ZXh0TGlzdCwgb2Zmc2V0OiBvZmZzZXQgfTtcbn1cblxuZnVuY3Rpb24gZmluZEN1cnJlbnRJbmRleChjdXJyZW50UG9pbnRzLCB4QXhpc1BvaW50cywgb3B0cywgY29uZmlnKSB7XG4gICAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogMDtcblxuICAgIHZhciBjdXJyZW50SW5kZXggPSAtMTtcbiAgICBpZiAoaXNJbkV4YWN0Q2hhcnRBcmVhKGN1cnJlbnRQb2ludHMsIG9wdHMsIGNvbmZpZykpIHtcbiAgICAgICAgeEF4aXNQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UG9pbnRzLnggKyBvZmZzZXQgPiBpdGVtKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG59XG5cbmZ1bmN0aW9uIGlzSW5FeGFjdENoYXJ0QXJlYShjdXJyZW50UG9pbnRzLCBvcHRzLCBjb25maWcpIHtcbiAgICByZXR1cm4gY3VycmVudFBvaW50cy54IDwgb3B0cy53aWR0aCAtIGNvbmZpZy5wYWRkaW5nICYmIGN1cnJlbnRQb2ludHMueCA+IGNvbmZpZy5wYWRkaW5nICsgY29uZmlnLnlBeGlzV2lkdGggKyBjb25maWcueUF4aXNUaXRsZVdpZHRoICYmIGN1cnJlbnRQb2ludHMueSA+IGNvbmZpZy5wYWRkaW5nICYmIGN1cnJlbnRQb2ludHMueSA8IG9wdHMuaGVpZ2h0IC0gY29uZmlnLmxlZ2VuZEhlaWdodCAtIGNvbmZpZy54QXhpc0hlaWdodCAtIGNvbmZpZy5wYWRkaW5nO1xufVxuXG5mdW5jdGlvbiBmaW5kUmFkYXJDaGFydEN1cnJlbnRJbmRleChjdXJyZW50UG9pbnRzLCByYWRhckRhdGEsIGNvdW50KSB7XG4gICAgdmFyIGVhY2hBbmdsZUFyZWEgPSAyICogTWF0aC5QSSAvIGNvdW50O1xuICAgIHZhciBjdXJyZW50SW5kZXggPSAtMTtcbiAgICBpZiAoaXNJbkV4YWN0UGllQ2hhcnRBcmVhKGN1cnJlbnRQb2ludHMsIHJhZGFyRGF0YS5jZW50ZXIsIHJhZGFyRGF0YS5yYWRpdXMpKSB7XG4gICAgICAgIHZhciBmaXhBbmdsZSA9IGZ1bmN0aW9uIGZpeEFuZ2xlKGFuZ2xlKSB7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgKz0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAyICogTWF0aC5QSSkge1xuICAgICAgICAgICAgICAgIGFuZ2xlIC09IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocmFkYXJEYXRhLmNlbnRlci55IC0gY3VycmVudFBvaW50cy55LCBjdXJyZW50UG9pbnRzLnggLSByYWRhckRhdGEuY2VudGVyLngpO1xuICAgICAgICBhbmdsZSA9IC0xICogYW5nbGU7XG4gICAgICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgICAgIGFuZ2xlICs9IDIgKiBNYXRoLlBJO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFuZ2xlTGlzdCA9IHJhZGFyRGF0YS5hbmdsZUxpc3QubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtID0gZml4QW5nbGUoLTEgKiBpdGVtKTtcblxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFuZ2xlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHJhbmdlU3RhcnQgPSBmaXhBbmdsZShpdGVtIC0gZWFjaEFuZ2xlQXJlYSAvIDIpO1xuICAgICAgICAgICAgdmFyIHJhbmdlRW5kID0gZml4QW5nbGUoaXRlbSArIGVhY2hBbmdsZUFyZWEgLyAyKTtcbiAgICAgICAgICAgIGlmIChyYW5nZUVuZCA8IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgICAgICAgICByYW5nZUVuZCArPSAyICogTWF0aC5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmdsZSA+PSByYW5nZVN0YXJ0ICYmIGFuZ2xlIDw9IHJhbmdlRW5kIHx8IGFuZ2xlICsgMiAqIE1hdGguUEkgPj0gcmFuZ2VTdGFydCAmJiBhbmdsZSArIDIgKiBNYXRoLlBJIDw9IHJhbmdlRW5kKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmRQaWVDaGFydEN1cnJlbnRJbmRleChjdXJyZW50UG9pbnRzLCBwaWVEYXRhKSB7XG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IC0xO1xuICAgIGlmIChpc0luRXhhY3RQaWVDaGFydEFyZWEoY3VycmVudFBvaW50cywgcGllRGF0YS5jZW50ZXIsIHBpZURhdGEucmFkaXVzKSkge1xuICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHBpZURhdGEuY2VudGVyLnkgLSBjdXJyZW50UG9pbnRzLnksIGN1cnJlbnRQb2ludHMueCAtIHBpZURhdGEuY2VudGVyLngpO1xuICAgICAgICBhbmdsZSA9IC1hbmdsZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBpZURhdGEuc2VyaWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHBpZURhdGEuc2VyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKGlzSW5BbmdsZVJhbmdlKGFuZ2xlLCBpdGVtLl9zdGFydF8sIGl0ZW0uX3N0YXJ0XyArIGl0ZW0uX3Byb3BvcnRpb25fICogMiAqIE1hdGguUEkpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG59XG5cbmZ1bmN0aW9uIGlzSW5FeGFjdFBpZUNoYXJ0QXJlYShjdXJyZW50UG9pbnRzLCBjZW50ZXIsIHJhZGl1cykge1xuICAgIHJldHVybiBNYXRoLnBvdyhjdXJyZW50UG9pbnRzLnggLSBjZW50ZXIueCwgMikgKyBNYXRoLnBvdyhjdXJyZW50UG9pbnRzLnkgLSBjZW50ZXIueSwgMikgPD0gTWF0aC5wb3cocmFkaXVzLCAyKTtcbn1cblxuZnVuY3Rpb24gc3BsaXRQb2ludHMocG9pbnRzKSB7XG4gICAgdmFyIG5ld1BvaW50cyA9IFtdO1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAoaXRlbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZXdQb2ludHMucHVzaChpdGVtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBuZXdQb2ludHMucHVzaChpdGVtcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1BvaW50cztcbn1cblxuZnVuY3Rpb24gY2FsTGVnZW5kRGF0YShzZXJpZXMsIG9wdHMsIGNvbmZpZykge1xuICAgIGlmIChvcHRzLmxlZ2VuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZ2VuZExpc3Q6IFtdLFxuICAgICAgICAgICAgbGVnZW5kSGVpZ2h0OiAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHZhciBwYWRkaW5nID0gNTtcbiAgICB2YXIgbWFyZ2luVG9wID0gODtcbiAgICB2YXIgc2hhcGVXaWR0aCA9IDE1O1xuICAgIHZhciBsZWdlbmRMaXN0ID0gW107XG4gICAgdmFyIHdpZHRoQ291bnQgPSAwO1xuICAgIHZhciBjdXJyZW50Um93ID0gW107XG4gICAgc2VyaWVzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGl0ZW1XaWR0aCA9IDMgKiBwYWRkaW5nICsgc2hhcGVXaWR0aCArIG1lYXN1cmVUZXh0KGl0ZW0ubmFtZSB8fCAndW5kZWZpbmRlZCcpO1xuICAgICAgICBpZiAod2lkdGhDb3VudCArIGl0ZW1XaWR0aCA+IG9wdHMud2lkdGgpIHtcbiAgICAgICAgICAgIGxlZ2VuZExpc3QucHVzaChjdXJyZW50Um93KTtcbiAgICAgICAgICAgIHdpZHRoQ291bnQgPSBpdGVtV2lkdGg7XG4gICAgICAgICAgICBjdXJyZW50Um93ID0gW2l0ZW1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGhDb3VudCArPSBpdGVtV2lkdGg7XG4gICAgICAgICAgICBjdXJyZW50Um93LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoY3VycmVudFJvdy5sZW5ndGgpIHtcbiAgICAgICAgbGVnZW5kTGlzdC5wdXNoKGN1cnJlbnRSb3cpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGxlZ2VuZExpc3Q6IGxlZ2VuZExpc3QsXG4gICAgICAgIGxlZ2VuZEhlaWdodDogbGVnZW5kTGlzdC5sZW5ndGggKiAoY29uZmlnLmZvbnRTaXplICsgbWFyZ2luVG9wKSArIHBhZGRpbmdcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjYWxDYXRlZ29yaWVzRGF0YShjYXRlZ29yaWVzLCBvcHRzLCBjb25maWcpIHtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBhbmdsZTogMCxcbiAgICAgICAgeEF4aXNIZWlnaHQ6IGNvbmZpZy54QXhpc0hlaWdodFxuICAgIH07XG5cbiAgICB2YXIgX2dldFhBeGlzUG9pbnRzID0gZ2V0WEF4aXNQb2ludHMoY2F0ZWdvcmllcywgb3B0cywgY29uZmlnKSxcbiAgICAgICAgZWFjaFNwYWNpbmcgPSBfZ2V0WEF4aXNQb2ludHMuZWFjaFNwYWNpbmc7XG5cbiAgICAvLyBnZXQgbWF4IGxlbmd0aCBvZiBjYXRlZ29yaWVzIHRleHRcblxuXG4gICAgdmFyIGNhdGVnb3JpZXNUZXh0TGVudGggPSBjYXRlZ29yaWVzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gbWVhc3VyZVRleHQoaXRlbSk7XG4gICAgfSk7XG5cbiAgICB2YXIgbWF4VGV4dExlbmd0aCA9IE1hdGgubWF4LmFwcGx5KHRoaXMsIGNhdGVnb3JpZXNUZXh0TGVudGgpO1xuXG4gICAgaWYgKG1heFRleHRMZW5ndGggKyAyICogY29uZmlnLnhBeGlzVGV4dFBhZGRpbmcgPiBlYWNoU3BhY2luZykge1xuICAgICAgICByZXN1bHQuYW5nbGUgPSA0NSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIHJlc3VsdC54QXhpc0hlaWdodCA9IDIgKiBjb25maWcueEF4aXNUZXh0UGFkZGluZyArIG1heFRleHRMZW5ndGggKiBNYXRoLnNpbihyZXN1bHQuYW5nbGUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldFJhZGFyRGF0YVBvaW50cyhhbmdsZUxpc3QsIGNlbnRlciwgcmFkaXVzLCBzZXJpZXMsIG9wdHMpIHtcbiAgICB2YXIgcHJvY2VzcyA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogMTtcblxuICAgIHZhciByYWRhck9wdGlvbiA9IG9wdHMuZXh0cmEucmFkYXIgfHwge307XG4gICAgcmFkYXJPcHRpb24ubWF4ID0gcmFkYXJPcHRpb24ubWF4IHx8IDA7XG4gICAgdmFyIG1heERhdGEgPSBNYXRoLm1heChyYWRhck9wdGlvbi5tYXgsIE1hdGgubWF4LmFwcGx5KG51bGwsIGRhdGFDb21iaW5lKHNlcmllcykpKTtcblxuICAgIHZhciBkYXRhID0gW107XG4gICAgc2VyaWVzLmZvckVhY2goZnVuY3Rpb24gKGVhY2gpIHtcbiAgICAgICAgdmFyIGxpc3RJdGVtID0ge307XG4gICAgICAgIGxpc3RJdGVtLmNvbG9yID0gZWFjaC5jb2xvcjtcbiAgICAgICAgbGlzdEl0ZW0uZGF0YSA9IFtdO1xuICAgICAgICBlYWNoLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSB7fTtcbiAgICAgICAgICAgIHRtcC5hbmdsZSA9IGFuZ2xlTGlzdFtpbmRleF07XG5cbiAgICAgICAgICAgIHRtcC5wcm9wb3J0aW9uID0gaXRlbSAvIG1heERhdGE7XG4gICAgICAgICAgICB0bXAucG9zaXRpb24gPSBjb252ZXJ0Q29vcmRpbmF0ZU9yaWdpbihyYWRpdXMgKiB0bXAucHJvcG9ydGlvbiAqIHByb2Nlc3MgKiBNYXRoLmNvcyh0bXAuYW5nbGUpLCByYWRpdXMgKiB0bXAucHJvcG9ydGlvbiAqIHByb2Nlc3MgKiBNYXRoLnNpbih0bXAuYW5nbGUpLCBjZW50ZXIpO1xuICAgICAgICAgICAgbGlzdEl0ZW0uZGF0YS5wdXNoKHRtcCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGEucHVzaChsaXN0SXRlbSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZ2V0UGllRGF0YVBvaW50cyhzZXJpZXMpIHtcbiAgICB2YXIgcHJvY2VzcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMTtcblxuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIF9zdGFydF8gPSAwO1xuICAgIHNlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uZGF0YSA9IGl0ZW0uZGF0YSA9PT0gbnVsbCA/IDAgOiBpdGVtLmRhdGE7XG4gICAgICAgIGNvdW50ICs9IGl0ZW0uZGF0YTtcbiAgICB9KTtcbiAgICBzZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtLmRhdGEgPSBpdGVtLmRhdGEgPT09IG51bGwgPyAwIDogaXRlbS5kYXRhO1xuICAgICAgICBpdGVtLl9wcm9wb3J0aW9uXyA9IGl0ZW0uZGF0YSAvIGNvdW50ICogcHJvY2VzcztcbiAgICB9KTtcbiAgICBzZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtLl9zdGFydF8gPSBfc3RhcnRfO1xuICAgICAgICBfc3RhcnRfICs9IDIgKiBpdGVtLl9wcm9wb3J0aW9uXyAqIE1hdGguUEk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VyaWVzO1xufVxuXG5mdW5jdGlvbiBnZXRQaWVUZXh0TWF4TGVuZ3RoKHNlcmllcykge1xuICAgIHNlcmllcyA9IGdldFBpZURhdGFQb2ludHMoc2VyaWVzKTtcbiAgICB2YXIgbWF4TGVuZ3RoID0gMDtcbiAgICBzZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgdGV4dCA9IGl0ZW0uZm9ybWF0ID8gaXRlbS5mb3JtYXQoK2l0ZW0uX3Byb3BvcnRpb25fLnRvRml4ZWQoMikpIDogdXRpbC50b0ZpeGVkKGl0ZW0uX3Byb3BvcnRpb25fICogMTAwKSArICclJztcbiAgICAgICAgbWF4TGVuZ3RoID0gTWF0aC5tYXgobWF4TGVuZ3RoLCBtZWFzdXJlVGV4dCh0ZXh0KSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWF4TGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBmaXhDb2x1bWVEYXRhKHBvaW50cywgZWFjaFNwYWNpbmcsIGNvbHVtbkxlbiwgaW5kZXgsIGNvbmZpZywgb3B0cykge1xuICAgIHJldHVybiBwb2ludHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLndpZHRoID0gKGVhY2hTcGFjaW5nIC0gMiAqIGNvbmZpZy5jb2x1bWVQYWRkaW5nKSAvIGNvbHVtbkxlbjtcblxuICAgICAgICBpZiAob3B0cy5leHRyYS5jb2x1bW4gJiYgb3B0cy5leHRyYS5jb2x1bW4ud2lkdGggJiYgK29wdHMuZXh0cmEuY29sdW1uLndpZHRoID4gMCkge1xuICAgICAgICAgICAgLy8gY3VzdG9tZXIgY29sdW1uIHdpZHRoXG4gICAgICAgICAgICBpdGVtLndpZHRoID0gTWF0aC5taW4oaXRlbS53aWR0aCwgK29wdHMuZXh0cmEuY29sdW1uLndpZHRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgd2lkdGggc2hvdWxkIGxlc3MgdHJhbiAyNXB4XG4gICAgICAgICAgICAvLyBkb24ndCBhc2sgbWUgd2h5LCBJIGRvbid0IGtub3dcbiAgICAgICAgICAgIGl0ZW0ud2lkdGggPSBNYXRoLm1pbihpdGVtLndpZHRoLCAyNSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS54ICs9IChpbmRleCArIDAuNSAtIGNvbHVtbkxlbiAvIDIpICogaXRlbS53aWR0aDtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0WEF4aXNQb2ludHMoY2F0ZWdvcmllcywgb3B0cywgY29uZmlnKSB7XG4gICAgdmFyIHlBeGlzVG90YWxXaWR0aCA9IGNvbmZpZy55QXhpc1dpZHRoICsgY29uZmlnLnlBeGlzVGl0bGVXaWR0aDtcbiAgICB2YXIgc3BhY2luZ1ZhbGlkID0gb3B0cy53aWR0aCAtIDIgKiBjb25maWcucGFkZGluZyAtIHlBeGlzVG90YWxXaWR0aDtcbiAgICB2YXIgZGF0YUNvdW50ID0gb3B0cy5lbmFibGVTY3JvbGwgPyBNYXRoLm1pbig1LCBjYXRlZ29yaWVzLmxlbmd0aCkgOiBjYXRlZ29yaWVzLmxlbmd0aDtcbiAgICB2YXIgZWFjaFNwYWNpbmcgPSBzcGFjaW5nVmFsaWQgLyBkYXRhQ291bnQ7XG5cbiAgICB2YXIgeEF4aXNQb2ludHMgPSBbXTtcbiAgICB2YXIgc3RhcnRYID0gY29uZmlnLnBhZGRpbmcgKyB5QXhpc1RvdGFsV2lkdGg7XG4gICAgdmFyIGVuZFggPSBvcHRzLndpZHRoIC0gY29uZmlnLnBhZGRpbmc7XG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICB4QXhpc1BvaW50cy5wdXNoKHN0YXJ0WCArIGluZGV4ICogZWFjaFNwYWNpbmcpO1xuICAgIH0pO1xuICAgIGlmIChvcHRzLmVuYWJsZVNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICB4QXhpc1BvaW50cy5wdXNoKHN0YXJ0WCArIGNhdGVnb3JpZXMubGVuZ3RoICogZWFjaFNwYWNpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHhBeGlzUG9pbnRzLnB1c2goZW5kWCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgeEF4aXNQb2ludHM6IHhBeGlzUG9pbnRzLCBzdGFydFg6IHN0YXJ0WCwgZW5kWDogZW5kWCwgZWFjaFNwYWNpbmc6IGVhY2hTcGFjaW5nIH07XG59XG5cbmZ1bmN0aW9uIGdldERhdGFQb2ludHMoZGF0YSwgbWluUmFuZ2UsIG1heFJhbmdlLCB4QXhpc1BvaW50cywgZWFjaFNwYWNpbmcsIG9wdHMsIGNvbmZpZykge1xuICAgIHZhciBwcm9jZXNzID0gYXJndW1lbnRzLmxlbmd0aCA+IDcgJiYgYXJndW1lbnRzWzddICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbN10gOiAxO1xuXG4gICAgdmFyIHBvaW50cyA9IFtdO1xuICAgIHZhciB2YWxpZEhlaWdodCA9IG9wdHMuaGVpZ2h0IC0gMiAqIGNvbmZpZy5wYWRkaW5nIC0gY29uZmlnLnhBeGlzSGVpZ2h0IC0gY29uZmlnLmxlZ2VuZEhlaWdodDtcbiAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IHt9O1xuICAgICAgICAgICAgcG9pbnQueCA9IHhBeGlzUG9pbnRzW2luZGV4XSArIE1hdGgucm91bmQoZWFjaFNwYWNpbmcgLyAyKTtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSB2YWxpZEhlaWdodCAqIChpdGVtIC0gbWluUmFuZ2UpIC8gKG1heFJhbmdlIC0gbWluUmFuZ2UpO1xuICAgICAgICAgICAgaGVpZ2h0ICo9IHByb2Nlc3M7XG4gICAgICAgICAgICBwb2ludC55ID0gb3B0cy5oZWlnaHQgLSBjb25maWcueEF4aXNIZWlnaHQgLSBjb25maWcubGVnZW5kSGVpZ2h0IC0gTWF0aC5yb3VuZChoZWlnaHQpIC0gY29uZmlnLnBhZGRpbmc7XG4gICAgICAgICAgICBwb2ludHMucHVzaChwb2ludCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwb2ludHM7XG59XG5cbmZ1bmN0aW9uIGdldFlBeGlzVGV4dExpc3Qoc2VyaWVzLCBvcHRzLCBjb25maWcpIHtcbiAgICB2YXIgZGF0YSA9IGRhdGFDb21iaW5lKHNlcmllcyk7XG4gICAgLy8gcmVtb3ZlIG51bGwgZnJvbSBkYXRhXG4gICAgZGF0YSA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBudWxsO1xuICAgIH0pO1xuICAgIHZhciBtaW5EYXRhID0gTWF0aC5taW4uYXBwbHkodGhpcywgZGF0YSk7XG4gICAgdmFyIG1heERhdGEgPSBNYXRoLm1heC5hcHBseSh0aGlzLCBkYXRhKTtcbiAgICBpZiAodHlwZW9mIG9wdHMueUF4aXMubWluID09PSAnbnVtYmVyJykge1xuICAgICAgICBtaW5EYXRhID0gTWF0aC5taW4ob3B0cy55QXhpcy5taW4sIG1pbkRhdGEpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdHMueUF4aXMubWF4ID09PSAnbnVtYmVyJykge1xuICAgICAgICBtYXhEYXRhID0gTWF0aC5tYXgob3B0cy55QXhpcy5tYXgsIG1heERhdGEpO1xuICAgIH1cblxuICAgIC8vIGZpeCBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20veGlhb2xpbjMzMDMvd3gtY2hhcnRzL2lzc3Vlcy85XG4gICAgaWYgKG1pbkRhdGEgPT09IG1heERhdGEpIHtcbiAgICAgICAgdmFyIHJhbmdlU3BhbiA9IG1heERhdGEgfHwgMTtcbiAgICAgICAgbWluRGF0YSAtPSByYW5nZVNwYW47XG4gICAgICAgIG1heERhdGEgKz0gcmFuZ2VTcGFuO1xuICAgIH1cblxuICAgIHZhciBkYXRhUmFuZ2UgPSBnZXREYXRhUmFuZ2UobWluRGF0YSwgbWF4RGF0YSk7XG4gICAgdmFyIG1pblJhbmdlID0gZGF0YVJhbmdlLm1pblJhbmdlO1xuICAgIHZhciBtYXhSYW5nZSA9IGRhdGFSYW5nZS5tYXhSYW5nZTtcblxuICAgIHZhciByYW5nZSA9IFtdO1xuICAgIHZhciBlYWNoUmFuZ2UgPSAobWF4UmFuZ2UgLSBtaW5SYW5nZSkgLyBjb25maWcueUF4aXNTcGxpdDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGNvbmZpZy55QXhpc1NwbGl0OyBpKyspIHtcbiAgICAgICAgcmFuZ2UucHVzaChtaW5SYW5nZSArIGVhY2hSYW5nZSAqIGkpO1xuICAgIH1cbiAgICByZXR1cm4gcmFuZ2UucmV2ZXJzZSgpO1xufVxuXG5mdW5jdGlvbiBjYWxZQXhpc0RhdGEoc2VyaWVzLCBvcHRzLCBjb25maWcpIHtcblxuICAgIHZhciByYW5nZXMgPSBnZXRZQXhpc1RleHRMaXN0KHNlcmllcywgb3B0cywgY29uZmlnKTtcbiAgICB2YXIgeUF4aXNXaWR0aCA9IGNvbmZpZy55QXhpc1dpZHRoO1xuICAgIHZhciByYW5nZXNGb3JtYXQgPSByYW5nZXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0gPSB1dGlsLnRvRml4ZWQoaXRlbSwgMik7XG4gICAgICAgIGl0ZW0gPSBvcHRzLnlBeGlzLmZvcm1hdCA/IG9wdHMueUF4aXMuZm9ybWF0KE51bWJlcihpdGVtKSkgOiBpdGVtO1xuICAgICAgICB5QXhpc1dpZHRoID0gTWF0aC5tYXgoeUF4aXNXaWR0aCwgbWVhc3VyZVRleHQoaXRlbSkgKyA1KTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gICAgaWYgKG9wdHMueUF4aXMuZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgeUF4aXNXaWR0aCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcmFuZ2VzRm9ybWF0OiByYW5nZXNGb3JtYXQsIHJhbmdlczogcmFuZ2VzLCB5QXhpc1dpZHRoOiB5QXhpc1dpZHRoIH07XG59XG5cbmZ1bmN0aW9uIGRyYXdQb2ludFNoYXBlKHBvaW50cywgY29sb3IsIHNoYXBlLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LnNldFN0cm9rZVN0eWxlKFwiI2ZmZmZmZlwiKTtcbiAgICBjb250ZXh0LnNldExpbmVXaWR0aCgxKTtcbiAgICBjb250ZXh0LnNldEZpbGxTdHlsZShjb2xvcik7XG5cbiAgICBpZiAoc2hhcGUgPT09ICdkaWFtb25kJykge1xuICAgICAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oaXRlbS54LCBpdGVtLnkgLSA0LjUpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGl0ZW0ueCAtIDQuNSwgaXRlbS55KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhpdGVtLngsIGl0ZW0ueSArIDQuNSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaXRlbS54ICsgNC41LCBpdGVtLnkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGl0ZW0ueCwgaXRlbS55IC0gNC41KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChzaGFwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGl0ZW0ueCArIDMuNSwgaXRlbS55KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFyYyhpdGVtLngsIGl0ZW0ueSwgNCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChzaGFwZSA9PT0gJ3JlY3QnKSB7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhpdGVtLnggLSAzLjUsIGl0ZW0ueSAtIDMuNSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZWN0KGl0ZW0ueCAtIDMuNSwgaXRlbS55IC0gMy41LCA3LCA3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChzaGFwZSA9PT0gJ3RyaWFuZ2xlJykge1xuICAgICAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oaXRlbS54LCBpdGVtLnkgLSA0LjUpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGl0ZW0ueCAtIDQuNSwgaXRlbS55ICsgNC41KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhpdGVtLnggKyA0LjUsIGl0ZW0ueSArIDQuNSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaXRlbS54LCBpdGVtLnkgLSA0LjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3UmluZ1RpdGxlKG9wdHMsIGNvbmZpZywgY29udGV4dCkge1xuICAgIHZhciB0aXRsZWZvbnRTaXplID0gb3B0cy50aXRsZS5mb250U2l6ZSB8fCBjb25maWcudGl0bGVGb250U2l6ZTtcbiAgICB2YXIgc3VidGl0bGVmb250U2l6ZSA9IG9wdHMuc3VidGl0bGUuZm9udFNpemUgfHwgY29uZmlnLnN1YnRpdGxlRm9udFNpemU7XG4gICAgdmFyIHRpdGxlID0gb3B0cy50aXRsZS5uYW1lIHx8ICcnO1xuICAgIHZhciBzdWJ0aXRsZSA9IG9wdHMuc3VidGl0bGUubmFtZSB8fCAnJztcbiAgICB2YXIgdGl0bGVGb250Q29sb3IgPSBvcHRzLnRpdGxlLmNvbG9yIHx8IGNvbmZpZy50aXRsZUNvbG9yO1xuICAgIHZhciBzdWJ0aXRsZUZvbnRDb2xvciA9IG9wdHMuc3VidGl0bGUuY29sb3IgfHwgY29uZmlnLnN1YnRpdGxlQ29sb3I7XG4gICAgdmFyIHRpdGxlSGVpZ2h0ID0gdGl0bGUgPyB0aXRsZWZvbnRTaXplIDogMDtcbiAgICB2YXIgc3VidGl0bGVIZWlnaHQgPSBzdWJ0aXRsZSA/IHN1YnRpdGxlZm9udFNpemUgOiAwO1xuICAgIHZhciBtYXJnaW4gPSA1O1xuICAgIGlmIChzdWJ0aXRsZSkge1xuICAgICAgICB2YXIgdGV4dFdpZHRoID0gbWVhc3VyZVRleHQoc3VidGl0bGUsIHN1YnRpdGxlZm9udFNpemUpO1xuICAgICAgICB2YXIgc3RhcnRYID0gKG9wdHMud2lkdGggLSB0ZXh0V2lkdGgpIC8gMiArIChvcHRzLnN1YnRpdGxlLm9mZnNldFggfHwgMCk7XG4gICAgICAgIHZhciBzdGFydFkgPSAob3B0cy5oZWlnaHQgLSBjb25maWcubGVnZW5kSGVpZ2h0ICsgc3VidGl0bGVmb250U2l6ZSkgLyAyO1xuICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgIHN0YXJ0WSAtPSAodGl0bGVIZWlnaHQgKyBtYXJnaW4pIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnNldEZvbnRTaXplKHN1YnRpdGxlZm9udFNpemUpO1xuICAgICAgICBjb250ZXh0LnNldEZpbGxTdHlsZShzdWJ0aXRsZUZvbnRDb2xvcik7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoc3VidGl0bGUsIHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICAgIHZhciBfdGV4dFdpZHRoID0gbWVhc3VyZVRleHQodGl0bGUsIHRpdGxlZm9udFNpemUpO1xuICAgICAgICB2YXIgX3N0YXJ0WCA9IChvcHRzLndpZHRoIC0gX3RleHRXaWR0aCkgLyAyICsgKG9wdHMudGl0bGUub2Zmc2V0WCB8fCAwKTtcbiAgICAgICAgdmFyIF9zdGFydFkgPSAob3B0cy5oZWlnaHQgLSBjb25maWcubGVnZW5kSGVpZ2h0ICsgdGl0bGVmb250U2l6ZSkgLyAyO1xuICAgICAgICBpZiAoc3VidGl0bGUpIHtcbiAgICAgICAgICAgIF9zdGFydFkgKz0gKHN1YnRpdGxlSGVpZ2h0ICsgbWFyZ2luKSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zZXRGb250U2l6ZSh0aXRsZWZvbnRTaXplKTtcbiAgICAgICAgY29udGV4dC5zZXRGaWxsU3R5bGUodGl0bGVGb250Q29sb3IpO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRpdGxlLCBfc3RhcnRYLCBfc3RhcnRZKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdQb2ludFRleHQocG9pbnRzLCBzZXJpZXMsIGNvbmZpZywgY29udGV4dCkge1xuICAgIC8vIOe7mOWItuaVsOaNruaWh+ahiFxuICAgIHZhciBkYXRhID0gc2VyaWVzLmRhdGE7XG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuc2V0Rm9udFNpemUoY29uZmlnLmZvbnRTaXplKTtcbiAgICBjb250ZXh0LnNldEZpbGxTdHlsZSgnIzY2NjY2NicpO1xuICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAoaXRlbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGZvcm1hdFZhbCA9IHNlcmllcy5mb3JtYXQgPyBzZXJpZXMuZm9ybWF0KGRhdGFbaW5kZXhdKSA6IGRhdGFbaW5kZXhdO1xuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChmb3JtYXRWYWwsIGl0ZW0ueCAtIG1lYXN1cmVUZXh0KGZvcm1hdFZhbCkgLyAyLCBpdGVtLnkgLSAyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cblxuZnVuY3Rpb24gZHJhd1JhZGFyTGFiZWwoYW5nbGVMaXN0LCByYWRpdXMsIGNlbnRlclBvc2l0aW9uLCBvcHRzLCBjb25maWcsIGNvbnRleHQpIHtcbiAgICB2YXIgcmFkYXJPcHRpb24gPSBvcHRzLmV4dHJhLnJhZGFyIHx8IHt9O1xuICAgIHJhZGl1cyArPSBjb25maWcucmFkYXJMYWJlbFRleHRNYXJnaW47XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LnNldEZvbnRTaXplKGNvbmZpZy5mb250U2l6ZSk7XG4gICAgY29udGV4dC5zZXRGaWxsU3R5bGUocmFkYXJPcHRpb24ubGFiZWxDb2xvciB8fCAnIzY2NjY2NicpO1xuICAgIGFuZ2xlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChhbmdsZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHBvcyA9IHtcbiAgICAgICAgICAgIHg6IHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgICAgIHk6IHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcG9zUmVsYXRpdmVDYW52YXMgPSBjb252ZXJ0Q29vcmRpbmF0ZU9yaWdpbihwb3MueCwgcG9zLnksIGNlbnRlclBvc2l0aW9uKTtcbiAgICAgICAgdmFyIHN0YXJ0WCA9IHBvc1JlbGF0aXZlQ2FudmFzLng7XG4gICAgICAgIHZhciBzdGFydFkgPSBwb3NSZWxhdGl2ZUNhbnZhcy55O1xuICAgICAgICBpZiAodXRpbC5hcHByb3hpbWF0ZWx5RXF1YWwocG9zLngsIDApKSB7XG4gICAgICAgICAgICBzdGFydFggLT0gbWVhc3VyZVRleHQob3B0cy5jYXRlZ29yaWVzW2luZGV4XSB8fCAnJykgLyAyO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcy54IDwgMCkge1xuICAgICAgICAgICAgc3RhcnRYIC09IG1lYXN1cmVUZXh0KG9wdHMuY2F0ZWdvcmllc1tpbmRleF0gfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQob3B0cy5jYXRlZ29yaWVzW2luZGV4XSB8fCAnJywgc3RhcnRYLCBzdGFydFkgKyBjb25maWcuZm9udFNpemUgLyAyKTtcbiAgICB9KTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdQaWVUZXh0KHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0LCByYWRpdXMsIGNlbnRlcikge1xuICAgIHZhciBsaW5lUmFkaXVzID0gcmFkaXVzICsgY29uZmlnLnBpZUNoYXJ0TGluZVBhZGRpbmc7XG4gICAgdmFyIHRleHRPYmplY3RDb2xsZWN0aW9uID0gW107XG4gICAgdmFyIGxhc3RUZXh0T2JqZWN0ID0gbnVsbDtcblxuICAgIHZhciBzZXJpZXNDb252ZXJ0ID0gc2VyaWVzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgYXJjID0gMiAqIE1hdGguUEkgLSAoaXRlbS5fc3RhcnRfICsgMiAqIE1hdGguUEkgKiBpdGVtLl9wcm9wb3J0aW9uXyAvIDIpO1xuICAgICAgICB2YXIgdGV4dCA9IGl0ZW0uZm9ybWF0ID8gaXRlbS5mb3JtYXQoK2l0ZW0uX3Byb3BvcnRpb25fLnRvRml4ZWQoMikpIDogdXRpbC50b0ZpeGVkKGl0ZW0uX3Byb3BvcnRpb25fICogMTAwKSArICclJztcbiAgICAgICAgdmFyIGNvbG9yID0gaXRlbS5jb2xvcjtcbiAgICAgICAgcmV0dXJuIHsgYXJjOiBhcmMsIHRleHQ6IHRleHQsIGNvbG9yOiBjb2xvciB9O1xuICAgIH0pO1xuICAgIHNlcmllc0NvbnZlcnQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAvLyBsaW5lIGVuZFxuICAgICAgICB2YXIgb3JnaW5YMSA9IE1hdGguY29zKGl0ZW0uYXJjKSAqIGxpbmVSYWRpdXM7XG4gICAgICAgIHZhciBvcmdpblkxID0gTWF0aC5zaW4oaXRlbS5hcmMpICogbGluZVJhZGl1cztcblxuICAgICAgICAvLyBsaW5lIHN0YXJ0XG4gICAgICAgIHZhciBvcmdpblgyID0gTWF0aC5jb3MoaXRlbS5hcmMpICogcmFkaXVzO1xuICAgICAgICB2YXIgb3JnaW5ZMiA9IE1hdGguc2luKGl0ZW0uYXJjKSAqIHJhZGl1cztcblxuICAgICAgICAvLyB0ZXh0IHN0YXJ0XG4gICAgICAgIHZhciBvcmdpblgzID0gb3JnaW5YMSA+PSAwID8gb3JnaW5YMSArIGNvbmZpZy5waWVDaGFydFRleHRQYWRkaW5nIDogb3JnaW5YMSAtIGNvbmZpZy5waWVDaGFydFRleHRQYWRkaW5nO1xuICAgICAgICB2YXIgb3JnaW5ZMyA9IG9yZ2luWTE7XG5cbiAgICAgICAgdmFyIHRleHRXaWR0aCA9IG1lYXN1cmVUZXh0KGl0ZW0udGV4dCk7XG4gICAgICAgIHZhciBzdGFydFkgPSBvcmdpblkzO1xuXG4gICAgICAgIGlmIChsYXN0VGV4dE9iamVjdCAmJiB1dGlsLmlzU2FtZVhDb29yZGluYXRlQXJlYShsYXN0VGV4dE9iamVjdC5zdGFydCwgeyB4OiBvcmdpblgzIH0pKSB7XG4gICAgICAgICAgICBpZiAob3JnaW5YMyA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSBNYXRoLm1pbihvcmdpblkzLCBsYXN0VGV4dE9iamVjdC5zdGFydC55KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3JnaW5YMSA8IDApIHtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSBNYXRoLm1heChvcmdpblkzLCBsYXN0VGV4dE9iamVjdC5zdGFydC55KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZ2luWTMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IE1hdGgubWF4KG9yZ2luWTMsIGxhc3RUZXh0T2JqZWN0LnN0YXJ0LnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IE1hdGgubWluKG9yZ2luWTMsIGxhc3RUZXh0T2JqZWN0LnN0YXJ0LnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcmdpblgzIDwgMCkge1xuICAgICAgICAgICAgb3JnaW5YMyAtPSB0ZXh0V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGV4dE9iamVjdCA9IHtcbiAgICAgICAgICAgIGxpbmVTdGFydDoge1xuICAgICAgICAgICAgICAgIHg6IG9yZ2luWDIsXG4gICAgICAgICAgICAgICAgeTogb3JnaW5ZMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVFbmQ6IHtcbiAgICAgICAgICAgICAgICB4OiBvcmdpblgxLFxuICAgICAgICAgICAgICAgIHk6IG9yZ2luWTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHg6IG9yZ2luWDMsXG4gICAgICAgICAgICAgICAgeTogc3RhcnRZXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6IHRleHRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogY29uZmlnLmZvbnRTaXplLFxuICAgICAgICAgICAgdGV4dDogaXRlbS50ZXh0LFxuICAgICAgICAgICAgY29sb3I6IGl0ZW0uY29sb3JcbiAgICAgICAgfTtcblxuICAgICAgICBsYXN0VGV4dE9iamVjdCA9IGF2b2lkQ29sbGlzaW9uKHRleHRPYmplY3QsIGxhc3RUZXh0T2JqZWN0KTtcbiAgICAgICAgdGV4dE9iamVjdENvbGxlY3Rpb24ucHVzaChsYXN0VGV4dE9iamVjdCk7XG4gICAgfSk7XG5cbiAgICB0ZXh0T2JqZWN0Q29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBsaW5lU3RhcnRQb2lzdGlvbiA9IGNvbnZlcnRDb29yZGluYXRlT3JpZ2luKGl0ZW0ubGluZVN0YXJ0LngsIGl0ZW0ubGluZVN0YXJ0LnksIGNlbnRlcik7XG4gICAgICAgIHZhciBsaW5lRW5kUG9pc3Rpb24gPSBjb252ZXJ0Q29vcmRpbmF0ZU9yaWdpbihpdGVtLmxpbmVFbmQueCwgaXRlbS5saW5lRW5kLnksIGNlbnRlcik7XG4gICAgICAgIHZhciB0ZXh0UG9zaXRpb24gPSBjb252ZXJ0Q29vcmRpbmF0ZU9yaWdpbihpdGVtLnN0YXJ0LngsIGl0ZW0uc3RhcnQueSwgY2VudGVyKTtcbiAgICAgICAgY29udGV4dC5zZXRMaW5lV2lkdGgoMSk7XG4gICAgICAgIGNvbnRleHQuc2V0Rm9udFNpemUoY29uZmlnLmZvbnRTaXplKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zZXRTdHJva2VTdHlsZShpdGVtLmNvbG9yKTtcbiAgICAgICAgY29udGV4dC5zZXRGaWxsU3R5bGUoaXRlbS5jb2xvcik7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKGxpbmVTdGFydFBvaXN0aW9uLngsIGxpbmVTdGFydFBvaXN0aW9uLnkpO1xuICAgICAgICB2YXIgY3VydmVTdGFydFggPSBpdGVtLnN0YXJ0LnggPCAwID8gdGV4dFBvc2l0aW9uLnggKyBpdGVtLndpZHRoIDogdGV4dFBvc2l0aW9uLng7XG4gICAgICAgIHZhciB0ZXh0U3RhcnRYID0gaXRlbS5zdGFydC54IDwgMCA/IHRleHRQb3NpdGlvbi54IC0gNSA6IHRleHRQb3NpdGlvbi54ICsgNTtcbiAgICAgICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKGxpbmVFbmRQb2lzdGlvbi54LCBsaW5lRW5kUG9pc3Rpb24ueSwgY3VydmVTdGFydFgsIHRleHRQb3NpdGlvbi55KTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8obGluZVN0YXJ0UG9pc3Rpb24ueCwgbGluZVN0YXJ0UG9pc3Rpb24ueSk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHRleHRQb3NpdGlvbi54ICsgaXRlbS53aWR0aCwgdGV4dFBvc2l0aW9uLnkpO1xuICAgICAgICBjb250ZXh0LmFyYyhjdXJ2ZVN0YXJ0WCwgdGV4dFBvc2l0aW9uLnksIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKCcjNjY2NjY2Jyk7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoaXRlbS50ZXh0LCB0ZXh0U3RhcnRYLCB0ZXh0UG9zaXRpb24ueSArIDMpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdUb29sVGlwU3BsaXRMaW5lKG9mZnNldFgsIG9wdHMsIGNvbmZpZywgY29udGV4dCkge1xuICAgIHZhciBzdGFydFkgPSBjb25maWcucGFkZGluZztcbiAgICB2YXIgZW5kWSA9IG9wdHMuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmcgLSBjb25maWcueEF4aXNIZWlnaHQgLSBjb25maWcubGVnZW5kSGVpZ2h0O1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5zZXRTdHJva2VTdHlsZSgnI2NjY2NjYycpO1xuICAgIGNvbnRleHQuc2V0TGluZVdpZHRoKDEpO1xuICAgIGNvbnRleHQubW92ZVRvKG9mZnNldFgsIHN0YXJ0WSk7XG4gICAgY29udGV4dC5saW5lVG8ob2Zmc2V0WCwgZW5kWSk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3VG9vbFRpcCh0ZXh0TGlzdCwgb2Zmc2V0LCBvcHRzLCBjb25maWcsIGNvbnRleHQpIHtcbiAgICB2YXIgbGVnZW5kV2lkdGggPSA0O1xuICAgIHZhciBsZWdlbmRNYXJnaW5SaWdodCA9IDU7XG4gICAgdmFyIGFycm93V2lkdGggPSA4O1xuICAgIHZhciBpc092ZXJSaWdodEJvcmRlciA9IGZhbHNlO1xuICAgIG9mZnNldCA9IGFzc2lnbih7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICB9LCBvZmZzZXQpO1xuICAgIG9mZnNldC55IC09IDg7XG4gICAgdmFyIHRleHRXaWR0aCA9IHRleHRMaXN0Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gbWVhc3VyZVRleHQoaXRlbS50ZXh0KTtcbiAgICB9KTtcblxuICAgIHZhciB0b29sVGlwV2lkdGggPSBsZWdlbmRXaWR0aCArIGxlZ2VuZE1hcmdpblJpZ2h0ICsgNCAqIGNvbmZpZy50b29sVGlwUGFkZGluZyArIE1hdGgubWF4LmFwcGx5KG51bGwsIHRleHRXaWR0aCk7XG4gICAgdmFyIHRvb2xUaXBIZWlnaHQgPSAyICogY29uZmlnLnRvb2xUaXBQYWRkaW5nICsgdGV4dExpc3QubGVuZ3RoICogY29uZmlnLnRvb2xUaXBMaW5lSGVpZ2h0O1xuXG4gICAgLy8gaWYgYmV5b25kIHRoZSByaWdodCBib3JkZXJcbiAgICBpZiAob2Zmc2V0LnggLSBNYXRoLmFicyhvcHRzLl9zY3JvbGxEaXN0YW5jZV8pICsgYXJyb3dXaWR0aCArIHRvb2xUaXBXaWR0aCA+IG9wdHMud2lkdGgpIHtcbiAgICAgICAgaXNPdmVyUmlnaHRCb3JkZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGRyYXcgYmFja2dyb3VuZCByZWN0XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LnNldEZpbGxTdHlsZShvcHRzLnRvb2x0aXAub3B0aW9uLmJhY2tncm91bmQgfHwgY29uZmlnLnRvb2xUaXBCYWNrZ3JvdW5kKTtcbiAgICBjb250ZXh0LnNldEdsb2JhbEFscGhhKGNvbmZpZy50b29sVGlwT3BhY2l0eSk7XG4gICAgaWYgKGlzT3ZlclJpZ2h0Qm9yZGVyKSB7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKG9mZnNldC54LCBvZmZzZXQueSArIDEwKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8ob2Zmc2V0LnggLSBhcnJvd1dpZHRoLCBvZmZzZXQueSArIDEwIC0gNSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKG9mZnNldC54IC0gYXJyb3dXaWR0aCwgb2Zmc2V0LnkgKyAxMCArIDUpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhvZmZzZXQueCwgb2Zmc2V0LnkgKyAxMCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3Qob2Zmc2V0LnggLSB0b29sVGlwV2lkdGggLSBhcnJvd1dpZHRoLCBvZmZzZXQueSwgdG9vbFRpcFdpZHRoLCB0b29sVGlwSGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhvZmZzZXQueCwgb2Zmc2V0LnkgKyAxMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKG9mZnNldC54ICsgYXJyb3dXaWR0aCwgb2Zmc2V0LnkgKyAxMCAtIDUpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyhvZmZzZXQueCArIGFycm93V2lkdGgsIG9mZnNldC55ICsgMTAgKyA1KTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8ob2Zmc2V0LngsIG9mZnNldC55ICsgMTApO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KG9mZnNldC54ICsgYXJyb3dXaWR0aCwgb2Zmc2V0LnksIHRvb2xUaXBXaWR0aCwgdG9vbFRpcEhlaWdodCk7XG4gICAgfVxuXG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgICBjb250ZXh0LnNldEdsb2JhbEFscGhhKDEpO1xuXG4gICAgLy8gZHJhdyBsZWdlbmRcbiAgICB0ZXh0TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnNldEZpbGxTdHlsZShpdGVtLmNvbG9yKTtcbiAgICAgICAgdmFyIHN0YXJ0WCA9IG9mZnNldC54ICsgYXJyb3dXaWR0aCArIDIgKiBjb25maWcudG9vbFRpcFBhZGRpbmc7XG4gICAgICAgIHZhciBzdGFydFkgPSBvZmZzZXQueSArIChjb25maWcudG9vbFRpcExpbmVIZWlnaHQgLSBjb25maWcuZm9udFNpemUpIC8gMiArIGNvbmZpZy50b29sVGlwTGluZUhlaWdodCAqIGluZGV4ICsgY29uZmlnLnRvb2xUaXBQYWRkaW5nO1xuICAgICAgICBpZiAoaXNPdmVyUmlnaHRCb3JkZXIpIHtcbiAgICAgICAgICAgIHN0YXJ0WCA9IG9mZnNldC54IC0gdG9vbFRpcFdpZHRoIC0gYXJyb3dXaWR0aCArIDIgKiBjb25maWcudG9vbFRpcFBhZGRpbmc7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzdGFydFgsIHN0YXJ0WSwgbGVnZW5kV2lkdGgsIGNvbmZpZy5mb250U2l6ZSk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfSk7XG5cbiAgICAvLyBkcmF3IHRleHQgbGlzdFxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5zZXRGb250U2l6ZShjb25maWcuZm9udFNpemUpO1xuICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKCcjZmZmZmZmJyk7XG4gICAgdGV4dExpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHN0YXJ0WCA9IG9mZnNldC54ICsgYXJyb3dXaWR0aCArIDIgKiBjb25maWcudG9vbFRpcFBhZGRpbmcgKyBsZWdlbmRXaWR0aCArIGxlZ2VuZE1hcmdpblJpZ2h0O1xuICAgICAgICBpZiAoaXNPdmVyUmlnaHRCb3JkZXIpIHtcbiAgICAgICAgICAgIHN0YXJ0WCA9IG9mZnNldC54IC0gdG9vbFRpcFdpZHRoIC0gYXJyb3dXaWR0aCArIDIgKiBjb25maWcudG9vbFRpcFBhZGRpbmcgKyArbGVnZW5kV2lkdGggKyBsZWdlbmRNYXJnaW5SaWdodDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnRZID0gb2Zmc2V0LnkgKyAoY29uZmlnLnRvb2xUaXBMaW5lSGVpZ2h0IC0gY29uZmlnLmZvbnRTaXplKSAvIDIgKyBjb25maWcudG9vbFRpcExpbmVIZWlnaHQgKiBpbmRleCArIGNvbmZpZy50b29sVGlwUGFkZGluZztcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChpdGVtLnRleHQsIHN0YXJ0WCwgc3RhcnRZICsgY29uZmlnLmZvbnRTaXplKTtcbiAgICB9KTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdZQXhpc1RpdGxlKHRpdGxlLCBvcHRzLCBjb25maWcsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhcnRYID0gY29uZmlnLnhBeGlzSGVpZ2h0ICsgKG9wdHMuaGVpZ2h0IC0gY29uZmlnLnhBeGlzSGVpZ2h0IC0gbWVhc3VyZVRleHQodGl0bGUpKSAvIDI7XG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LnNldEZvbnRTaXplKGNvbmZpZy5mb250U2l6ZSk7XG4gICAgY29udGV4dC5zZXRGaWxsU3R5bGUob3B0cy55QXhpcy50aXRsZUZvbnRDb2xvciB8fCAnIzMzMzMzMycpO1xuICAgIGNvbnRleHQudHJhbnNsYXRlKDAsIG9wdHMuaGVpZ2h0KTtcbiAgICBjb250ZXh0LnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRpdGxlLCBzdGFydFgsIGNvbmZpZy5wYWRkaW5nICsgMC41ICogY29uZmlnLmZvbnRTaXplKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdDb2x1bW5EYXRhUG9pbnRzKHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KSB7XG4gICAgdmFyIHByb2Nlc3MgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IDE7XG5cbiAgICB2YXIgX2NhbFlBeGlzRGF0YSA9IGNhbFlBeGlzRGF0YShzZXJpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgIHJhbmdlcyA9IF9jYWxZQXhpc0RhdGEucmFuZ2VzO1xuXG4gICAgdmFyIF9nZXRYQXhpc1BvaW50cyA9IGdldFhBeGlzUG9pbnRzKG9wdHMuY2F0ZWdvcmllcywgb3B0cywgY29uZmlnKSxcbiAgICAgICAgeEF4aXNQb2ludHMgPSBfZ2V0WEF4aXNQb2ludHMueEF4aXNQb2ludHMsXG4gICAgICAgIGVhY2hTcGFjaW5nID0gX2dldFhBeGlzUG9pbnRzLmVhY2hTcGFjaW5nO1xuXG4gICAgdmFyIG1pblJhbmdlID0gcmFuZ2VzLnBvcCgpO1xuICAgIHZhciBtYXhSYW5nZSA9IHJhbmdlcy5zaGlmdCgpO1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGlmIChvcHRzLl9zY3JvbGxEaXN0YW5jZV8gJiYgb3B0cy5fc2Nyb2xsRGlzdGFuY2VfICE9PSAwICYmIG9wdHMuZW5hYmxlU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKG9wdHMuX3Njcm9sbERpc3RhbmNlXywgMCk7XG4gICAgfVxuXG4gICAgc2VyaWVzLmZvckVhY2goZnVuY3Rpb24gKGVhY2hTZXJpZXMsIHNlcmllc0luZGV4KSB7XG4gICAgICAgIHZhciBkYXRhID0gZWFjaFNlcmllcy5kYXRhO1xuICAgICAgICB2YXIgcG9pbnRzID0gZ2V0RGF0YVBvaW50cyhkYXRhLCBtaW5SYW5nZSwgbWF4UmFuZ2UsIHhBeGlzUG9pbnRzLCBlYWNoU3BhY2luZywgb3B0cywgY29uZmlnLCBwcm9jZXNzKTtcbiAgICAgICAgcG9pbnRzID0gZml4Q29sdW1lRGF0YShwb2ludHMsIGVhY2hTcGFjaW5nLCBzZXJpZXMubGVuZ3RoLCBzZXJpZXNJbmRleCwgY29uZmlnLCBvcHRzKTtcblxuICAgICAgICAvLyDnu5jliLbmn7HnirbmlbDmja7lm75cbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zZXRGaWxsU3R5bGUoZWFjaFNlcmllcy5jb2xvcik7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRYID0gaXRlbS54IC0gaXRlbS53aWR0aCAvIDIgKyAxO1xuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBvcHRzLmhlaWdodCAtIGl0ZW0ueSAtIGNvbmZpZy5wYWRkaW5nIC0gY29uZmlnLnhBeGlzSGVpZ2h0IC0gY29uZmlnLmxlZ2VuZEhlaWdodDtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhzdGFydFgsIGl0ZW0ueSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZWN0KHN0YXJ0WCwgaXRlbS55LCBpdGVtLndpZHRoIC0gMiwgaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgIH0pO1xuICAgIHNlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChlYWNoU2VyaWVzLCBzZXJpZXNJbmRleCkge1xuICAgICAgICB2YXIgZGF0YSA9IGVhY2hTZXJpZXMuZGF0YTtcbiAgICAgICAgdmFyIHBvaW50cyA9IGdldERhdGFQb2ludHMoZGF0YSwgbWluUmFuZ2UsIG1heFJhbmdlLCB4QXhpc1BvaW50cywgZWFjaFNwYWNpbmcsIG9wdHMsIGNvbmZpZywgcHJvY2Vzcyk7XG4gICAgICAgIHBvaW50cyA9IGZpeENvbHVtZURhdGEocG9pbnRzLCBlYWNoU3BhY2luZywgc2VyaWVzLmxlbmd0aCwgc2VyaWVzSW5kZXgsIGNvbmZpZywgb3B0cyk7XG4gICAgICAgIGlmIChvcHRzLmRhdGFMYWJlbCAhPT0gZmFsc2UgJiYgcHJvY2VzcyA9PT0gMSkge1xuICAgICAgICAgICAgZHJhd1BvaW50VGV4dChwb2ludHMsIGVhY2hTZXJpZXMsIGNvbmZpZywgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB4QXhpc1BvaW50czogeEF4aXNQb2ludHMsXG4gICAgICAgIGVhY2hTcGFjaW5nOiBlYWNoU3BhY2luZ1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRyYXdBcmVhRGF0YVBvaW50cyhzZXJpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCkge1xuICAgIHZhciBwcm9jZXNzID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiAxO1xuXG4gICAgdmFyIF9jYWxZQXhpc0RhdGEyID0gY2FsWUF4aXNEYXRhKHNlcmllcywgb3B0cywgY29uZmlnKSxcbiAgICAgICAgcmFuZ2VzID0gX2NhbFlBeGlzRGF0YTIucmFuZ2VzO1xuXG4gICAgdmFyIF9nZXRYQXhpc1BvaW50czIgPSBnZXRYQXhpc1BvaW50cyhvcHRzLmNhdGVnb3JpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgIHhBeGlzUG9pbnRzID0gX2dldFhBeGlzUG9pbnRzMi54QXhpc1BvaW50cyxcbiAgICAgICAgZWFjaFNwYWNpbmcgPSBfZ2V0WEF4aXNQb2ludHMyLmVhY2hTcGFjaW5nO1xuXG4gICAgdmFyIG1pblJhbmdlID0gcmFuZ2VzLnBvcCgpO1xuICAgIHZhciBtYXhSYW5nZSA9IHJhbmdlcy5zaGlmdCgpO1xuICAgIHZhciBlbmRZID0gb3B0cy5oZWlnaHQgLSBjb25maWcucGFkZGluZyAtIGNvbmZpZy54QXhpc0hlaWdodCAtIGNvbmZpZy5sZWdlbmRIZWlnaHQ7XG4gICAgdmFyIGNhbFBvaW50cyA9IFtdO1xuXG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgaWYgKG9wdHMuX3Njcm9sbERpc3RhbmNlXyAmJiBvcHRzLl9zY3JvbGxEaXN0YW5jZV8gIT09IDAgJiYgb3B0cy5lbmFibGVTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3B0cy5fc2Nyb2xsRGlzdGFuY2VfLCAwKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy50b29sdGlwICYmIG9wdHMudG9vbHRpcC50ZXh0TGlzdCAmJiBvcHRzLnRvb2x0aXAudGV4dExpc3QubGVuZ3RoICYmIHByb2Nlc3MgPT09IDEpIHtcbiAgICAgICAgZHJhd1Rvb2xUaXBTcGxpdExpbmUob3B0cy50b29sdGlwLm9mZnNldC54LCBvcHRzLCBjb25maWcsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHNlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChlYWNoU2VyaWVzLCBzZXJpZXNJbmRleCkge1xuICAgICAgICB2YXIgZGF0YSA9IGVhY2hTZXJpZXMuZGF0YTtcbiAgICAgICAgdmFyIHBvaW50cyA9IGdldERhdGFQb2ludHMoZGF0YSwgbWluUmFuZ2UsIG1heFJhbmdlLCB4QXhpc1BvaW50cywgZWFjaFNwYWNpbmcsIG9wdHMsIGNvbmZpZywgcHJvY2Vzcyk7XG4gICAgICAgIGNhbFBvaW50cy5wdXNoKHBvaW50cyk7XG5cbiAgICAgICAgdmFyIHNwbGl0UG9pbnRMaXN0ID0gc3BsaXRQb2ludHMocG9pbnRzKTtcblxuICAgICAgICBzcGxpdFBvaW50TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludHMpIHtcbiAgICAgICAgICAgIC8vIOe7mOWItuWMuuWfn+aVsOaNrlxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0U3Ryb2tlU3R5bGUoZWFjaFNlcmllcy5jb2xvcik7XG4gICAgICAgICAgICBjb250ZXh0LnNldEZpbGxTdHlsZShlYWNoU2VyaWVzLmNvbG9yKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0R2xvYmFsQWxwaGEoMC42KTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0TGluZVdpZHRoKDIpO1xuICAgICAgICAgICAgaWYgKHBvaW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0UG9pbnQgPSBwb2ludHNbMF07XG4gICAgICAgICAgICAgICAgdmFyIGxhc3RQb2ludCA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhmaXJzdFBvaW50LngsIGZpcnN0UG9pbnQueSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuZXh0cmEubGluZVN0eWxlID09PSAnY3VydmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdHJsUG9pbnQgPSBjcmVhdGVDdXJ2ZUNvbnRyb2xQb2ludHMocG9pbnRzLCBpbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhjdHJsUG9pbnQuY3RyQS54LCBjdHJsUG9pbnQuY3RyQS55LCBjdHJsUG9pbnQuY3RyQi54LCBjdHJsUG9pbnQuY3RyQi55LCBpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8obGFzdFBvaW50LngsIGVuZFkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGZpcnN0UG9pbnQueCwgZW5kWSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oZmlyc3RQb2ludC54LCBmaXJzdFBvaW50LnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHBvaW50c1swXTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhpdGVtLnggLSBlYWNoU3BhY2luZyAvIDIsIGl0ZW0ueSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaXRlbS54ICsgZWFjaFNwYWNpbmcgLyAyLCBpdGVtLnkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGl0ZW0ueCArIGVhY2hTcGFjaW5nIC8gMiwgZW5kWSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaXRlbS54IC0gZWFjaFNwYWNpbmcgLyAyLCBlbmRZKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhpdGVtLnggLSBlYWNoU3BhY2luZyAvIDIsIGl0ZW0ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldEdsb2JhbEFscGhhKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob3B0cy5kYXRhUG9pbnRTaGFwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBzaGFwZSA9IGNvbmZpZy5kYXRhUG9pbnRTaGFwZVtzZXJpZXNJbmRleCAlIGNvbmZpZy5kYXRhUG9pbnRTaGFwZS5sZW5ndGhdO1xuICAgICAgICAgICAgZHJhd1BvaW50U2hhcGUocG9pbnRzLCBlYWNoU2VyaWVzLmNvbG9yLCBzaGFwZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAob3B0cy5kYXRhTGFiZWwgIT09IGZhbHNlICYmIHByb2Nlc3MgPT09IDEpIHtcbiAgICAgICAgc2VyaWVzLmZvckVhY2goZnVuY3Rpb24gKGVhY2hTZXJpZXMsIHNlcmllc0luZGV4KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGVhY2hTZXJpZXMuZGF0YTtcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBnZXREYXRhUG9pbnRzKGRhdGEsIG1pblJhbmdlLCBtYXhSYW5nZSwgeEF4aXNQb2ludHMsIGVhY2hTcGFjaW5nLCBvcHRzLCBjb25maWcsIHByb2Nlc3MpO1xuICAgICAgICAgICAgZHJhd1BvaW50VGV4dChwb2ludHMsIGVhY2hTZXJpZXMsIGNvbmZpZywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeEF4aXNQb2ludHM6IHhBeGlzUG9pbnRzLFxuICAgICAgICBjYWxQb2ludHM6IGNhbFBvaW50cyxcbiAgICAgICAgZWFjaFNwYWNpbmc6IGVhY2hTcGFjaW5nXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZHJhd0xpbmVEYXRhUG9pbnRzKHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KSB7XG4gICAgdmFyIHByb2Nlc3MgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IDE7XG5cbiAgICB2YXIgX2NhbFlBeGlzRGF0YTMgPSBjYWxZQXhpc0RhdGEoc2VyaWVzLCBvcHRzLCBjb25maWcpLFxuICAgICAgICByYW5nZXMgPSBfY2FsWUF4aXNEYXRhMy5yYW5nZXM7XG5cbiAgICB2YXIgX2dldFhBeGlzUG9pbnRzMyA9IGdldFhBeGlzUG9pbnRzKG9wdHMuY2F0ZWdvcmllcywgb3B0cywgY29uZmlnKSxcbiAgICAgICAgeEF4aXNQb2ludHMgPSBfZ2V0WEF4aXNQb2ludHMzLnhBeGlzUG9pbnRzLFxuICAgICAgICBlYWNoU3BhY2luZyA9IF9nZXRYQXhpc1BvaW50czMuZWFjaFNwYWNpbmc7XG5cbiAgICB2YXIgbWluUmFuZ2UgPSByYW5nZXMucG9wKCk7XG4gICAgdmFyIG1heFJhbmdlID0gcmFuZ2VzLnNoaWZ0KCk7XG4gICAgdmFyIGNhbFBvaW50cyA9IFtdO1xuXG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgaWYgKG9wdHMuX3Njcm9sbERpc3RhbmNlXyAmJiBvcHRzLl9zY3JvbGxEaXN0YW5jZV8gIT09IDAgJiYgb3B0cy5lbmFibGVTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3B0cy5fc2Nyb2xsRGlzdGFuY2VfLCAwKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy50b29sdGlwICYmIG9wdHMudG9vbHRpcC50ZXh0TGlzdCAmJiBvcHRzLnRvb2x0aXAudGV4dExpc3QubGVuZ3RoICYmIHByb2Nlc3MgPT09IDEpIHtcbiAgICAgICAgZHJhd1Rvb2xUaXBTcGxpdExpbmUob3B0cy50b29sdGlwLm9mZnNldC54LCBvcHRzLCBjb25maWcsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHNlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChlYWNoU2VyaWVzLCBzZXJpZXNJbmRleCkge1xuICAgICAgICB2YXIgZGF0YSA9IGVhY2hTZXJpZXMuZGF0YTtcbiAgICAgICAgdmFyIHBvaW50cyA9IGdldERhdGFQb2ludHMoZGF0YSwgbWluUmFuZ2UsIG1heFJhbmdlLCB4QXhpc1BvaW50cywgZWFjaFNwYWNpbmcsIG9wdHMsIGNvbmZpZywgcHJvY2Vzcyk7XG4gICAgICAgIGNhbFBvaW50cy5wdXNoKHBvaW50cyk7XG4gICAgICAgIHZhciBzcGxpdFBvaW50TGlzdCA9IHNwbGl0UG9pbnRzKHBvaW50cyk7XG5cbiAgICAgICAgc3BsaXRQb2ludExpc3QuZm9yRWFjaChmdW5jdGlvbiAocG9pbnRzLCBpbmRleCkge1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0U3Ryb2tlU3R5bGUoZWFjaFNlcmllcy5jb2xvcik7XG4gICAgICAgICAgICBjb250ZXh0LnNldExpbmVXaWR0aCgyKTtcbiAgICAgICAgICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLngsIHBvaW50c1swXS55KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFyYyhwb2ludHNbMF0ueCwgcG9pbnRzWzBdLnksIDEsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLngsIHBvaW50c1swXS55KTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5leHRyYS5saW5lU3R5bGUgPT09ICdjdXJ2ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN0cmxQb2ludCA9IGNyZWF0ZUN1cnZlQ29udHJvbFBvaW50cyhwb2ludHMsIGluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKGN0cmxQb2ludC5jdHJBLngsIGN0cmxQb2ludC5jdHJBLnksIGN0cmxQb2ludC5jdHJCLngsIGN0cmxQb2ludC5jdHJCLnksIGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLngsIHBvaW50c1swXS55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob3B0cy5kYXRhUG9pbnRTaGFwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBzaGFwZSA9IGNvbmZpZy5kYXRhUG9pbnRTaGFwZVtzZXJpZXNJbmRleCAlIGNvbmZpZy5kYXRhUG9pbnRTaGFwZS5sZW5ndGhdO1xuICAgICAgICAgICAgZHJhd1BvaW50U2hhcGUocG9pbnRzLCBlYWNoU2VyaWVzLmNvbG9yLCBzaGFwZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAob3B0cy5kYXRhTGFiZWwgIT09IGZhbHNlICYmIHByb2Nlc3MgPT09IDEpIHtcbiAgICAgICAgc2VyaWVzLmZvckVhY2goZnVuY3Rpb24gKGVhY2hTZXJpZXMsIHNlcmllc0luZGV4KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGVhY2hTZXJpZXMuZGF0YTtcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBnZXREYXRhUG9pbnRzKGRhdGEsIG1pblJhbmdlLCBtYXhSYW5nZSwgeEF4aXNQb2ludHMsIGVhY2hTcGFjaW5nLCBvcHRzLCBjb25maWcsIHByb2Nlc3MpO1xuICAgICAgICAgICAgZHJhd1BvaW50VGV4dChwb2ludHMsIGVhY2hTZXJpZXMsIGNvbmZpZywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeEF4aXNQb2ludHM6IHhBeGlzUG9pbnRzLFxuICAgICAgICBjYWxQb2ludHM6IGNhbFBvaW50cyxcbiAgICAgICAgZWFjaFNwYWNpbmc6IGVhY2hTcGFjaW5nXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZHJhd1Rvb2xUaXBCcmlkZ2Uob3B0cywgY29uZmlnLCBjb250ZXh0LCBwcm9jZXNzKSB7XG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgaWYgKG9wdHMuX3Njcm9sbERpc3RhbmNlXyAmJiBvcHRzLl9zY3JvbGxEaXN0YW5jZV8gIT09IDAgJiYgb3B0cy5lbmFibGVTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3B0cy5fc2Nyb2xsRGlzdGFuY2VfLCAwKTtcbiAgICB9XG4gICAgaWYgKG9wdHMudG9vbHRpcCAmJiBvcHRzLnRvb2x0aXAudGV4dExpc3QgJiYgb3B0cy50b29sdGlwLnRleHRMaXN0Lmxlbmd0aCAmJiBwcm9jZXNzID09PSAxKSB7XG4gICAgICAgIGRyYXdUb29sVGlwKG9wdHMudG9vbHRpcC50ZXh0TGlzdCwgb3B0cy50b29sdGlwLm9mZnNldCwgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICB9XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdYQXhpcyhjYXRlZ29yaWVzLCBvcHRzLCBjb25maWcsIGNvbnRleHQpIHtcbiAgICB2YXIgX2dldFhBeGlzUG9pbnRzNCA9IGdldFhBeGlzUG9pbnRzKGNhdGVnb3JpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgIHhBeGlzUG9pbnRzID0gX2dldFhBeGlzUG9pbnRzNC54QXhpc1BvaW50cyxcbiAgICAgICAgc3RhcnRYID0gX2dldFhBeGlzUG9pbnRzNC5zdGFydFgsXG4gICAgICAgIGVuZFggPSBfZ2V0WEF4aXNQb2ludHM0LmVuZFgsXG4gICAgICAgIGVhY2hTcGFjaW5nID0gX2dldFhBeGlzUG9pbnRzNC5lYWNoU3BhY2luZztcblxuICAgIHZhciBzdGFydFkgPSBvcHRzLmhlaWdodCAtIGNvbmZpZy5wYWRkaW5nIC0gY29uZmlnLnhBeGlzSGVpZ2h0IC0gY29uZmlnLmxlZ2VuZEhlaWdodDtcbiAgICB2YXIgZW5kWSA9IHN0YXJ0WSArIGNvbmZpZy54QXhpc0xpbmVIZWlnaHQ7XG5cbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBpZiAob3B0cy5fc2Nyb2xsRGlzdGFuY2VfICYmIG9wdHMuX3Njcm9sbERpc3RhbmNlXyAhPT0gMCkge1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShvcHRzLl9zY3JvbGxEaXN0YW5jZV8sIDApO1xuICAgIH1cblxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5zZXRTdHJva2VTdHlsZShvcHRzLnhBeGlzLmdyaWRDb2xvciB8fCBcIiNjY2NjY2NcIik7XG5cbiAgICBpZiAob3B0cy54QXhpcy5kaXNhYmxlR3JpZCAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAob3B0cy54QXhpcy50eXBlID09PSAnY2FsaWJyYXRpb24nKSB7XG4gICAgICAgICAgICB4QXhpc1BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oaXRlbSAtIGVhY2hTcGFjaW5nIC8gMiwgc3RhcnRZKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaXRlbSAtIGVhY2hTcGFjaW5nIC8gMiwgc3RhcnRZICsgNCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4QXhpc1BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGl0ZW0sIHN0YXJ0WSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaXRlbSwgZW5kWSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICAvLyDlr7lY6L205YiX6KGo5YGa5oq956iA5aSE55CGXG4gICAgdmFyIHZhbGlkV2lkdGggPSBvcHRzLndpZHRoIC0gMiAqIGNvbmZpZy5wYWRkaW5nIC0gY29uZmlnLnlBeGlzV2lkdGggLSBjb25maWcueUF4aXNUaXRsZVdpZHRoO1xuICAgIHZhciBtYXhYQXhpc0xpc3RMZW5ndGggPSBNYXRoLm1pbihjYXRlZ29yaWVzLmxlbmd0aCwgTWF0aC5jZWlsKHZhbGlkV2lkdGggLyBjb25maWcuZm9udFNpemUgLyAxLjUpKTtcbiAgICB2YXIgcmF0aW8gPSBNYXRoLmNlaWwoY2F0ZWdvcmllcy5sZW5ndGggLyBtYXhYQXhpc0xpc3RMZW5ndGgpO1xuXG4gICAgY2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gaW5kZXggJSByYXRpbyAhPT0gMCA/ICcnIDogaXRlbTtcbiAgICB9KTtcblxuICAgIGlmIChjb25maWcuX3hBeGlzVGV4dEFuZ2xlXyA9PT0gMCkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnNldEZvbnRTaXplKGNvbmZpZy5mb250U2l6ZSk7XG4gICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKG9wdHMueEF4aXMuZm9udENvbG9yIHx8ICcjNjY2NjY2Jyk7XG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBlYWNoU3BhY2luZyAvIDIgLSBtZWFzdXJlVGV4dChpdGVtKSAvIDI7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGl0ZW0sIHhBeGlzUG9pbnRzW2luZGV4XSArIG9mZnNldCwgc3RhcnRZICsgY29uZmlnLmZvbnRTaXplICsgNSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0Rm9udFNpemUoY29uZmlnLmZvbnRTaXplKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKG9wdHMueEF4aXMuZm9udENvbG9yIHx8ICcjNjY2NjY2Jyk7XG4gICAgICAgICAgICB2YXIgdGV4dFdpZHRoID0gbWVhc3VyZVRleHQoaXRlbSk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZWFjaFNwYWNpbmcgLyAyIC0gdGV4dFdpZHRoO1xuXG4gICAgICAgICAgICB2YXIgX2NhbFJvdGF0ZVRyYW5zbGF0ZSA9IGNhbFJvdGF0ZVRyYW5zbGF0ZSh4QXhpc1BvaW50c1tpbmRleF0gKyBlYWNoU3BhY2luZyAvIDIsIHN0YXJ0WSArIGNvbmZpZy5mb250U2l6ZSAvIDIgKyA1LCBvcHRzLmhlaWdodCksXG4gICAgICAgICAgICAgICAgdHJhbnNYID0gX2NhbFJvdGF0ZVRyYW5zbGF0ZS50cmFuc1gsXG4gICAgICAgICAgICAgICAgdHJhbnNZID0gX2NhbFJvdGF0ZVRyYW5zbGF0ZS50cmFuc1k7XG5cbiAgICAgICAgICAgIGNvbnRleHQucm90YXRlKC0xICogY29uZmlnLl94QXhpc1RleHRBbmdsZV8pO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUodHJhbnNYLCB0cmFuc1kpO1xuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChpdGVtLCB4QXhpc1BvaW50c1tpbmRleF0gKyBvZmZzZXQsIHN0YXJ0WSArIGNvbmZpZy5mb250U2l6ZSArIDUpO1xuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdZQXhpc0dyaWQob3B0cywgY29uZmlnLCBjb250ZXh0KSB7XG4gICAgdmFyIHNwYWNpbmdWYWxpZCA9IG9wdHMuaGVpZ2h0IC0gMiAqIGNvbmZpZy5wYWRkaW5nIC0gY29uZmlnLnhBeGlzSGVpZ2h0IC0gY29uZmlnLmxlZ2VuZEhlaWdodDtcbiAgICB2YXIgZWFjaFNwYWNpbmcgPSBNYXRoLmZsb29yKHNwYWNpbmdWYWxpZCAvIGNvbmZpZy55QXhpc1NwbGl0KTtcbiAgICB2YXIgeUF4aXNUb3RhbFdpZHRoID0gY29uZmlnLnlBeGlzV2lkdGggKyBjb25maWcueUF4aXNUaXRsZVdpZHRoO1xuICAgIHZhciBzdGFydFggPSBjb25maWcucGFkZGluZyArIHlBeGlzVG90YWxXaWR0aDtcbiAgICB2YXIgZW5kWCA9IG9wdHMud2lkdGggLSBjb25maWcucGFkZGluZztcblxuICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbmZpZy55QXhpc1NwbGl0OyBpKyspIHtcbiAgICAgICAgcG9pbnRzLnB1c2goY29uZmlnLnBhZGRpbmcgKyBlYWNoU3BhY2luZyAqIGkpO1xuICAgIH1cbiAgICBwb2ludHMucHVzaChjb25maWcucGFkZGluZyArIGVhY2hTcGFjaW5nICogY29uZmlnLnlBeGlzU3BsaXQgKyAyKTtcblxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5zZXRTdHJva2VTdHlsZShvcHRzLnlBeGlzLmdyaWRDb2xvciB8fCBcIiNjY2NjY2NcIik7XG4gICAgY29udGV4dC5zZXRMaW5lV2lkdGgoMSk7XG4gICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHN0YXJ0WCwgaXRlbSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKGVuZFgsIGl0ZW0pO1xuICAgIH0pO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cblxuZnVuY3Rpb24gZHJhd1lBeGlzKHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KSB7XG4gICAgaWYgKG9wdHMueUF4aXMuZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBfY2FsWUF4aXNEYXRhNCA9IGNhbFlBeGlzRGF0YShzZXJpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgIHJhbmdlc0Zvcm1hdCA9IF9jYWxZQXhpc0RhdGE0LnJhbmdlc0Zvcm1hdDtcblxuICAgIHZhciB5QXhpc1RvdGFsV2lkdGggPSBjb25maWcueUF4aXNXaWR0aCArIGNvbmZpZy55QXhpc1RpdGxlV2lkdGg7XG5cbiAgICB2YXIgc3BhY2luZ1ZhbGlkID0gb3B0cy5oZWlnaHQgLSAyICogY29uZmlnLnBhZGRpbmcgLSBjb25maWcueEF4aXNIZWlnaHQgLSBjb25maWcubGVnZW5kSGVpZ2h0O1xuICAgIHZhciBlYWNoU3BhY2luZyA9IE1hdGguZmxvb3Ioc3BhY2luZ1ZhbGlkIC8gY29uZmlnLnlBeGlzU3BsaXQpO1xuICAgIHZhciBzdGFydFggPSBjb25maWcucGFkZGluZyArIHlBeGlzVG90YWxXaWR0aDtcbiAgICB2YXIgZW5kWCA9IG9wdHMud2lkdGggLSBjb25maWcucGFkZGluZztcbiAgICB2YXIgZW5kWSA9IG9wdHMuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmcgLSBjb25maWcueEF4aXNIZWlnaHQgLSBjb25maWcubGVnZW5kSGVpZ2h0O1xuXG4gICAgLy8gc2V0IFlBeGlzIGJhY2tncm91bmRcbiAgICBjb250ZXh0LnNldEZpbGxTdHlsZShvcHRzLmJhY2tncm91bmQgfHwgJyNmZmZmZmYnKTtcbiAgICBpZiAob3B0cy5fc2Nyb2xsRGlzdGFuY2VfIDwgMCkge1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHN0YXJ0WCwgZW5kWSArIGNvbmZpZy54QXhpc0hlaWdodCArIDUpO1xuICAgIH1cbiAgICBjb250ZXh0LmZpbGxSZWN0KGVuZFgsIDAsIG9wdHMud2lkdGgsIGVuZFkgKyBjb25maWcueEF4aXNIZWlnaHQgKyA1KTtcblxuICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBjb25maWcueUF4aXNTcGxpdDsgaSsrKSB7XG4gICAgICAgIHBvaW50cy5wdXNoKGNvbmZpZy5wYWRkaW5nICsgZWFjaFNwYWNpbmcgKiBpKTtcbiAgICB9XG5cbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5zZXRGb250U2l6ZShjb25maWcuZm9udFNpemUpO1xuICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKG9wdHMueUF4aXMuZm9udENvbG9yIHx8ICcjNjY2NjY2Jyk7XG4gICAgcmFuZ2VzRm9ybWF0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHZhciBwb3MgPSBwb2ludHNbaW5kZXhdID8gcG9pbnRzW2luZGV4XSA6IGVuZFk7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoaXRlbSwgY29uZmlnLnBhZGRpbmcgKyBjb25maWcueUF4aXNUaXRsZVdpZHRoLCBwb3MgKyBjb25maWcuZm9udFNpemUgLyAyKTtcbiAgICB9KTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICBpZiAob3B0cy55QXhpcy50aXRsZSkge1xuICAgICAgICBkcmF3WUF4aXNUaXRsZShvcHRzLnlBeGlzLnRpdGxlLCBvcHRzLCBjb25maWcsIGNvbnRleHQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhd0xlZ2VuZChzZXJpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCkge1xuICAgIGlmICghb3B0cy5sZWdlbmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBlYWNoIGxlZ2VuZCBzaGFwZSB3aWR0aCAxNXB4XG4gICAgLy8gdGhlIHNwYWNpbmcgYmV0d2VlbiBzaGFwZSBhbmQgdGV4dCBpbiBlYWNoIGxlZ2VuZCBpcyB0aGUgYHBhZGRpbmdgXG4gICAgLy8gZWFjaCBsZWdlbmQgc3BhY2luZyBpcyB0aGUgYHBhZGRpbmdgXG4gICAgLy8gbGVnZW5kIG1hcmdpbiB0b3AgYGNvbmZpZy5wYWRkaW5nYFxuXG4gICAgdmFyIF9jYWxMZWdlbmREYXRhID0gY2FsTGVnZW5kRGF0YShzZXJpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgIGxlZ2VuZExpc3QgPSBfY2FsTGVnZW5kRGF0YS5sZWdlbmRMaXN0O1xuXG4gICAgdmFyIHBhZGRpbmcgPSA1O1xuICAgIHZhciBtYXJnaW5Ub3AgPSA4O1xuICAgIHZhciBzaGFwZVdpZHRoID0gMTU7XG4gICAgbGVnZW5kTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtTGlzdCwgbGlzdEluZGV4KSB7XG4gICAgICAgIHZhciB3aWR0aCA9IDA7XG4gICAgICAgIGl0ZW1MaXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZSB8fCAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIHdpZHRoICs9IDMgKiBwYWRkaW5nICsgbWVhc3VyZVRleHQoaXRlbS5uYW1lKSArIHNoYXBlV2lkdGg7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc3RhcnRYID0gKG9wdHMud2lkdGggLSB3aWR0aCkgLyAyICsgcGFkZGluZztcbiAgICAgICAgdmFyIHN0YXJ0WSA9IG9wdHMuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmcgLSBjb25maWcubGVnZW5kSGVpZ2h0ICsgbGlzdEluZGV4ICogKGNvbmZpZy5mb250U2l6ZSArIG1hcmdpblRvcCkgKyBwYWRkaW5nICsgbWFyZ2luVG9wO1xuXG4gICAgICAgIGNvbnRleHQuc2V0Rm9udFNpemUoY29uZmlnLmZvbnRTaXplKTtcbiAgICAgICAgaXRlbUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgc3dpdGNoIChvcHRzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zZXRMaW5lV2lkdGgoMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0U3Ryb2tlU3R5bGUoaXRlbS5jb2xvcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHN0YXJ0WCAtIDIsIHN0YXJ0WSArIDUpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhzdGFydFggKyAxNywgc3RhcnRZICsgNSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0TGluZVdpZHRoKDEpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNldFN0cm9rZVN0eWxlKCcjZmZmZmZmJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKGl0ZW0uY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhzdGFydFggKyA3LjUsIHN0YXJ0WSArIDUpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmFyYyhzdGFydFggKyA3LjUsIHN0YXJ0WSArIDUsIDQsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BpZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmluZyc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKGl0ZW0uY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhzdGFydFggKyA3LjUsIHN0YXJ0WSArIDUpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmFyYyhzdGFydFggKyA3LjUsIHN0YXJ0WSArIDUsIDcsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKGl0ZW0uY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucmVjdChzdGFydFgsIHN0YXJ0WSwgMTUsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFydFggKz0gcGFkZGluZyArIHNoYXBlV2lkdGg7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5zZXRGaWxsU3R5bGUob3B0cy5leHRyYS5sZWdlbmRUZXh0Q29sb3IgfHwgJyMzMzMzMzMnKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQoaXRlbS5uYW1lLCBzdGFydFgsIHN0YXJ0WSArIDkpO1xuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBzdGFydFggKz0gbWVhc3VyZVRleHQoaXRlbS5uYW1lKSArIDIgKiBwYWRkaW5nO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRyYXdQaWVEYXRhUG9pbnRzKHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KSB7XG4gICAgdmFyIHByb2Nlc3MgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IDE7XG5cbiAgICB2YXIgcGllT3B0aW9uID0gb3B0cy5leHRyYS5waWUgfHwge307XG4gICAgc2VyaWVzID0gZ2V0UGllRGF0YVBvaW50cyhzZXJpZXMsIHByb2Nlc3MpO1xuICAgIHZhciBjZW50ZXJQb3NpdGlvbiA9IHtcbiAgICAgICAgeDogb3B0cy53aWR0aCAvIDIsXG4gICAgICAgIHk6IChvcHRzLmhlaWdodCAtIGNvbmZpZy5sZWdlbmRIZWlnaHQpIC8gMlxuICAgIH07XG4gICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKGNlbnRlclBvc2l0aW9uLnggLSBjb25maWcucGllQ2hhcnRMaW5lUGFkZGluZyAtIGNvbmZpZy5waWVDaGFydFRleHRQYWRkaW5nIC0gY29uZmlnLl9waWVUZXh0TWF4TGVuZ3RoXywgY2VudGVyUG9zaXRpb24ueSAtIGNvbmZpZy5waWVDaGFydExpbmVQYWRkaW5nIC0gY29uZmlnLnBpZUNoYXJ0VGV4dFBhZGRpbmcpO1xuICAgIGlmIChvcHRzLmRhdGFMYWJlbCkge1xuICAgICAgICByYWRpdXMgLT0gMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmFkaXVzIC09IDIgKiBjb25maWcucGFkZGluZztcbiAgICB9XG4gICAgc2VyaWVzID0gc2VyaWVzLm1hcChmdW5jdGlvbiAoZWFjaFNlcmllcykge1xuICAgICAgICBlYWNoU2VyaWVzLl9zdGFydF8gKz0gKHBpZU9wdGlvbi5vZmZzZXRBbmdsZSB8fCAwKSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIHJldHVybiBlYWNoU2VyaWVzO1xuICAgIH0pO1xuICAgIHNlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChlYWNoU2VyaWVzKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0TGluZVdpZHRoKDIpO1xuICAgICAgICBjb250ZXh0LnNldFN0cm9rZVN0eWxlKCcjZmZmZmZmJyk7XG4gICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKGVhY2hTZXJpZXMuY29sb3IpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhjZW50ZXJQb3NpdGlvbi54LCBjZW50ZXJQb3NpdGlvbi55KTtcbiAgICAgICAgY29udGV4dC5hcmMoY2VudGVyUG9zaXRpb24ueCwgY2VudGVyUG9zaXRpb24ueSwgcmFkaXVzLCBlYWNoU2VyaWVzLl9zdGFydF8sIGVhY2hTZXJpZXMuX3N0YXJ0XyArIDIgKiBlYWNoU2VyaWVzLl9wcm9wb3J0aW9uXyAqIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgaWYgKG9wdHMuZGlzYWJsZVBpZVN0cm9rZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG9wdHMudHlwZSA9PT0gJ3JpbmcnKSB7XG4gICAgICAgIHZhciBpbm5lclBpZVdpZHRoID0gcmFkaXVzICogMC42O1xuICAgICAgICBpZiAodHlwZW9mIG9wdHMuZXh0cmEucmluZ1dpZHRoID09PSAnbnVtYmVyJyAmJiBvcHRzLmV4dHJhLnJpbmdXaWR0aCA+IDApIHtcbiAgICAgICAgICAgIGlubmVyUGllV2lkdGggPSBNYXRoLm1heCgwLCByYWRpdXMgLSBvcHRzLmV4dHJhLnJpbmdXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zZXRGaWxsU3R5bGUob3B0cy5iYWNrZ3JvdW5kIHx8ICcjZmZmZmZmJyk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKGNlbnRlclBvc2l0aW9uLngsIGNlbnRlclBvc2l0aW9uLnkpO1xuICAgICAgICBjb250ZXh0LmFyYyhjZW50ZXJQb3NpdGlvbi54LCBjZW50ZXJQb3NpdGlvbi55LCBpbm5lclBpZVdpZHRoLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRhdGFMYWJlbCAhPT0gZmFsc2UgJiYgcHJvY2VzcyA9PT0gMSkge1xuICAgICAgICAvLyBmaXggaHR0cHM6Ly9naXRodWIuY29tL3hpYW9saW4zMzAzL3d4LWNoYXJ0cy9pc3N1ZXMvMTMyXG4gICAgICAgIHZhciB2YWxpZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VyaWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLmRhdGEgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICBkcmF3UGllVGV4dChzZXJpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCwgcmFkaXVzLCBjZW50ZXJQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvY2VzcyA9PT0gMSAmJiBvcHRzLnR5cGUgPT09ICdyaW5nJykge1xuICAgICAgICBkcmF3UmluZ1RpdGxlKG9wdHMsIGNvbmZpZywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2VudGVyOiBjZW50ZXJQb3NpdGlvbixcbiAgICAgICAgcmFkaXVzOiByYWRpdXMsXG4gICAgICAgIHNlcmllczogc2VyaWVzXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZHJhd1JhZGFyRGF0YVBvaW50cyhzZXJpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCkge1xuICAgIHZhciBwcm9jZXNzID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiAxO1xuXG4gICAgdmFyIHJhZGFyT3B0aW9uID0gb3B0cy5leHRyYS5yYWRhciB8fCB7fTtcbiAgICB2YXIgY29vcmRpbmF0ZUFuZ2xlID0gZ2V0UmFkYXJDb29yZGluYXRlU2VyaWVzKG9wdHMuY2F0ZWdvcmllcy5sZW5ndGgpO1xuICAgIHZhciBjZW50ZXJQb3NpdGlvbiA9IHtcbiAgICAgICAgeDogb3B0cy53aWR0aCAvIDIsXG4gICAgICAgIHk6IChvcHRzLmhlaWdodCAtIGNvbmZpZy5sZWdlbmRIZWlnaHQpIC8gMlxuICAgIH07XG5cbiAgICB2YXIgcmFkaXVzID0gTWF0aC5taW4oY2VudGVyUG9zaXRpb24ueCAtIChnZXRNYXhUZXh0TGlzdExlbmd0aChvcHRzLmNhdGVnb3JpZXMpICsgY29uZmlnLnJhZGFyTGFiZWxUZXh0TWFyZ2luKSwgY2VudGVyUG9zaXRpb24ueSAtIGNvbmZpZy5yYWRhckxhYmVsVGV4dE1hcmdpbik7XG5cbiAgICByYWRpdXMgLT0gY29uZmlnLnBhZGRpbmc7XG5cbiAgICAvLyBkcmF3IGdyaWRcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuc2V0TGluZVdpZHRoKDEpO1xuICAgIGNvbnRleHQuc2V0U3Ryb2tlU3R5bGUocmFkYXJPcHRpb24uZ3JpZENvbG9yIHx8IFwiI2NjY2NjY1wiKTtcbiAgICBjb29yZGluYXRlQW5nbGUuZm9yRWFjaChmdW5jdGlvbiAoYW5nbGUpIHtcbiAgICAgICAgdmFyIHBvcyA9IGNvbnZlcnRDb29yZGluYXRlT3JpZ2luKHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSwgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpLCBjZW50ZXJQb3NpdGlvbik7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKGNlbnRlclBvc2l0aW9uLngsIGNlbnRlclBvc2l0aW9uLnkpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyhwb3MueCwgcG9zLnkpO1xuICAgIH0pO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgIC8vIGRyYXcgc3BsaXQgbGluZSBncmlkXG5cbiAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XG4gICAgICAgIHZhciBzdGFydFBvcyA9IHt9O1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnNldExpbmVXaWR0aCgxKTtcbiAgICAgICAgY29udGV4dC5zZXRTdHJva2VTdHlsZShyYWRhck9wdGlvbi5ncmlkQ29sb3IgfHwgXCIjY2NjY2NjXCIpO1xuICAgICAgICBjb29yZGluYXRlQW5nbGUuZm9yRWFjaChmdW5jdGlvbiAoYW5nbGUsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gY29udmVydENvb3JkaW5hdGVPcmlnaW4ocmFkaXVzIC8gY29uZmlnLnJhZGFyR3JpZENvdW50ICogaSAqIE1hdGguY29zKGFuZ2xlKSwgcmFkaXVzIC8gY29uZmlnLnJhZGFyR3JpZENvdW50ICogaSAqIE1hdGguc2luKGFuZ2xlKSwgY2VudGVyUG9zaXRpb24pO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgPSBwb3M7XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9zLngsIHBvcy55KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9zLngsIHBvcy55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHN0YXJ0UG9zLngsIHN0YXJ0UG9zLnkpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBjb25maWcucmFkYXJHcmlkQ291bnQ7IGkrKykge1xuICAgICAgICBfbG9vcChpKTtcbiAgICB9XG5cbiAgICB2YXIgcmFkYXJEYXRhUG9pbnRzID0gZ2V0UmFkYXJEYXRhUG9pbnRzKGNvb3JkaW5hdGVBbmdsZSwgY2VudGVyUG9zaXRpb24sIHJhZGl1cywgc2VyaWVzLCBvcHRzLCBwcm9jZXNzKTtcbiAgICByYWRhckRhdGFQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoZWFjaFNlcmllcywgc2VyaWVzSW5kZXgpIHtcbiAgICAgICAgLy8g57uY5Yi25Yy65Z+f5pWw5o2uXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0RmlsbFN0eWxlKGVhY2hTZXJpZXMuY29sb3IpO1xuICAgICAgICBjb250ZXh0LnNldEdsb2JhbEFscGhhKDAuNik7XG4gICAgICAgIGVhY2hTZXJpZXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oaXRlbS5wb3NpdGlvbi54LCBpdGVtLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhpdGVtLnBvc2l0aW9uLngsIGl0ZW0ucG9zaXRpb24ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5zZXRHbG9iYWxBbHBoYSgxKTtcblxuICAgICAgICBpZiAob3B0cy5kYXRhUG9pbnRTaGFwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBzaGFwZSA9IGNvbmZpZy5kYXRhUG9pbnRTaGFwZVtzZXJpZXNJbmRleCAlIGNvbmZpZy5kYXRhUG9pbnRTaGFwZS5sZW5ndGhdO1xuICAgICAgICAgICAgdmFyIHBvaW50cyA9IGVhY2hTZXJpZXMuZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5wb3NpdGlvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZHJhd1BvaW50U2hhcGUocG9pbnRzLCBlYWNoU2VyaWVzLmNvbG9yLCBzaGFwZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBkcmF3IGxhYmVsIHRleHRcbiAgICBkcmF3UmFkYXJMYWJlbChjb29yZGluYXRlQW5nbGUsIHJhZGl1cywgY2VudGVyUG9zaXRpb24sIG9wdHMsIGNvbmZpZywgY29udGV4dCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjZW50ZXI6IGNlbnRlclBvc2l0aW9uLFxuICAgICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgICAgYW5nbGVMaXN0OiBjb29yZGluYXRlQW5nbGVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkcmF3Q2FudmFzKG9wdHMsIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmRyYXcoKTtcbn1cblxudmFyIFRpbWluZyA9IHtcbiAgICBlYXNlSW46IGZ1bmN0aW9uIGVhc2VJbihwb3MpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KHBvcywgMyk7XG4gICAgfSxcblxuICAgIGVhc2VPdXQ6IGZ1bmN0aW9uIGVhc2VPdXQocG9zKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MgLSAxLCAzKSArIDE7XG4gICAgfSxcblxuICAgIGVhc2VJbk91dDogZnVuY3Rpb24gZWFzZUluT3V0KHBvcykge1xuICAgICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcywgMyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKE1hdGgucG93KHBvcyAtIDIsIDMpICsgMik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGluZWFyOiBmdW5jdGlvbiBsaW5lYXIocG9zKSB7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gQW5pbWF0aW9uKG9wdHMpIHtcbiAgICB0aGlzLmlzU3RvcCA9IGZhbHNlO1xuICAgIG9wdHMuZHVyYXRpb24gPSB0eXBlb2Ygb3B0cy5kdXJhdGlvbiA9PT0gJ3VuZGVmaW5lZCcgPyAxMDAwIDogb3B0cy5kdXJhdGlvbjtcbiAgICBvcHRzLnRpbWluZyA9IG9wdHMudGltaW5nIHx8ICdsaW5lYXInO1xuXG4gICAgdmFyIGRlbGF5ID0gMTc7XG5cbiAgICB2YXIgY3JlYXRlQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiBjcmVhdGVBbmltYXRpb25GcmFtZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGVwLCBkZWxheSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gK25ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0ZXAodGltZVN0YW1wKTtcbiAgICAgICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGVwKSB7XG4gICAgICAgICAgICAgICAgc3RlcChudWxsKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBhbmltYXRpb25GcmFtZSA9IGNyZWF0ZUFuaW1hdGlvbkZyYW1lKCk7XG4gICAgdmFyIHN0YXJ0VGltZVN0YW1wID0gbnVsbDtcbiAgICB2YXIgX3N0ZXAgPSBmdW5jdGlvbiBzdGVwKHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGltZXN0YW1wID09PSBudWxsIHx8IHRoaXMuaXNTdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICBvcHRzLm9uUHJvY2VzcyAmJiBvcHRzLm9uUHJvY2VzcygxKTtcbiAgICAgICAgICAgIG9wdHMub25BbmltYXRpb25GaW5pc2ggJiYgb3B0cy5vbkFuaW1hdGlvbkZpbmlzaCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydFRpbWVTdGFtcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhcnRUaW1lU3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHN0YXJ0VGltZVN0YW1wIDwgb3B0cy5kdXJhdGlvbikge1xuICAgICAgICAgICAgdmFyIHByb2Nlc3MgPSAodGltZXN0YW1wIC0gc3RhcnRUaW1lU3RhbXApIC8gb3B0cy5kdXJhdGlvbjtcbiAgICAgICAgICAgIHZhciB0aW1pbmdGdW5jdGlvbiA9IFRpbWluZ1tvcHRzLnRpbWluZ107XG4gICAgICAgICAgICBwcm9jZXNzID0gdGltaW5nRnVuY3Rpb24ocHJvY2Vzcyk7XG4gICAgICAgICAgICBvcHRzLm9uUHJvY2VzcyAmJiBvcHRzLm9uUHJvY2Vzcyhwcm9jZXNzKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lKF9zdGVwLCBkZWxheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzLm9uUHJvY2VzcyAmJiBvcHRzLm9uUHJvY2VzcygxKTtcbiAgICAgICAgICAgIG9wdHMub25BbmltYXRpb25GaW5pc2ggJiYgb3B0cy5vbkFuaW1hdGlvbkZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBfc3RlcCA9IF9zdGVwLmJpbmQodGhpcyk7XG5cbiAgICBhbmltYXRpb25GcmFtZShfc3RlcCwgZGVsYXkpO1xufVxuXG4vLyBzdG9wIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuLy8gYW5kIHRpZ2dlciBvbkFuaW1hdGlvbkZpbmlzaFxuQW5pbWF0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNTdG9wID0gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGRyYXdDaGFydHModHlwZSwgb3B0cywgY29uZmlnLCBjb250ZXh0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBzZXJpZXMgPSBvcHRzLnNlcmllcztcbiAgICB2YXIgY2F0ZWdvcmllcyA9IG9wdHMuY2F0ZWdvcmllcztcbiAgICBzZXJpZXMgPSBmaWxsU2VyaWVzQ29sb3Ioc2VyaWVzLCBjb25maWcpO1xuXG4gICAgdmFyIF9jYWxMZWdlbmREYXRhID0gY2FsTGVnZW5kRGF0YShzZXJpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgIGxlZ2VuZEhlaWdodCA9IF9jYWxMZWdlbmREYXRhLmxlZ2VuZEhlaWdodDtcblxuICAgIGNvbmZpZy5sZWdlbmRIZWlnaHQgPSBsZWdlbmRIZWlnaHQ7XG5cbiAgICB2YXIgX2NhbFlBeGlzRGF0YSA9IGNhbFlBeGlzRGF0YShzZXJpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgIHlBeGlzV2lkdGggPSBfY2FsWUF4aXNEYXRhLnlBeGlzV2lkdGg7XG5cbiAgICBjb25maWcueUF4aXNXaWR0aCA9IHlBeGlzV2lkdGg7XG4gICAgaWYgKGNhdGVnb3JpZXMgJiYgY2F0ZWdvcmllcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIF9jYWxDYXRlZ29yaWVzRGF0YSA9IGNhbENhdGVnb3JpZXNEYXRhKGNhdGVnb3JpZXMsIG9wdHMsIGNvbmZpZyksXG4gICAgICAgICAgICB4QXhpc0hlaWdodCA9IF9jYWxDYXRlZ29yaWVzRGF0YS54QXhpc0hlaWdodCxcbiAgICAgICAgICAgIGFuZ2xlID0gX2NhbENhdGVnb3JpZXNEYXRhLmFuZ2xlO1xuXG4gICAgICAgIGNvbmZpZy54QXhpc0hlaWdodCA9IHhBeGlzSGVpZ2h0O1xuICAgICAgICBjb25maWcuX3hBeGlzVGV4dEFuZ2xlXyA9IGFuZ2xlO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ3BpZScgfHwgdHlwZSA9PT0gJ3JpbmcnKSB7XG4gICAgICAgIGNvbmZpZy5fcGllVGV4dE1heExlbmd0aF8gPSBvcHRzLmRhdGFMYWJlbCA9PT0gZmFsc2UgPyAwIDogZ2V0UGllVGV4dE1heExlbmd0aChzZXJpZXMpO1xuICAgIH1cblxuICAgIHZhciBkdXJhdGlvbiA9IG9wdHMuYW5pbWF0aW9uID8gMTAwMCA6IDA7XG4gICAgdGhpcy5hbmltYXRpb25JbnN0YW5jZSAmJiB0aGlzLmFuaW1hdGlvbkluc3RhbmNlLnN0b3AoKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGluZSc6XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkluc3RhbmNlID0gbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgdGltaW5nOiAnZWFzZUluJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgb25Qcm9jZXNzOiBmdW5jdGlvbiBvblByb2Nlc3MocHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBkcmF3WUF4aXNHcmlkKG9wdHMsIGNvbmZpZywgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kcmF3TGluZURhdGFQb2ludHMgPSBkcmF3TGluZURhdGFQb2ludHMoc2VyaWVzLCBvcHRzLCBjb25maWcsIGNvbnRleHQsIHByb2Nlc3MpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeEF4aXNQb2ludHMgPSBfZHJhd0xpbmVEYXRhUG9pbnRzLnhBeGlzUG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsUG9pbnRzID0gX2RyYXdMaW5lRGF0YVBvaW50cy5jYWxQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlYWNoU3BhY2luZyA9IF9kcmF3TGluZURhdGFQb2ludHMuZWFjaFNwYWNpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2hhcnREYXRhLnhBeGlzUG9pbnRzID0geEF4aXNQb2ludHM7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoYXJ0RGF0YS5jYWxQb2ludHMgPSBjYWxQb2ludHM7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoYXJ0RGF0YS5lYWNoU3BhY2luZyA9IGVhY2hTcGFjaW5nO1xuICAgICAgICAgICAgICAgICAgICBkcmF3WEF4aXMoY2F0ZWdvcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0xlZ2VuZChvcHRzLnNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1lBeGlzKHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1Rvb2xUaXBCcmlkZ2Uob3B0cywgY29uZmlnLCBjb250ZXh0LCBwcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0NhbnZhcyhvcHRzLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQW5pbWF0aW9uRmluaXNoOiBmdW5jdGlvbiBvbkFuaW1hdGlvbkZpbmlzaCgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZXZlbnQudHJpZ2dlcigncmVuZGVyQ29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JbnN0YW5jZSA9IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpbWluZzogJ2Vhc2VJbicsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIG9uUHJvY2VzczogZnVuY3Rpb24gb25Qcm9jZXNzKHByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1lBeGlzR3JpZChvcHRzLCBjb25maWcsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZHJhd0NvbHVtbkRhdGFQb2ludHMgPSBkcmF3Q29sdW1uRGF0YVBvaW50cyhzZXJpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCwgcHJvY2VzcyksXG4gICAgICAgICAgICAgICAgICAgICAgICB4QXhpc1BvaW50cyA9IF9kcmF3Q29sdW1uRGF0YVBvaW50cy54QXhpc1BvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhY2hTcGFjaW5nID0gX2RyYXdDb2x1bW5EYXRhUG9pbnRzLmVhY2hTcGFjaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoYXJ0RGF0YS54QXhpc1BvaW50cyA9IHhBeGlzUG9pbnRzO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jaGFydERhdGEuZWFjaFNwYWNpbmcgPSBlYWNoU3BhY2luZztcbiAgICAgICAgICAgICAgICAgICAgZHJhd1hBeGlzKGNhdGVnb3JpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdMZWdlbmQob3B0cy5zZXJpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdZQXhpcyhzZXJpZXMsIG9wdHMsIGNvbmZpZywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdDYW52YXMob3B0cywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkFuaW1hdGlvbkZpbmlzaDogZnVuY3Rpb24gb25BbmltYXRpb25GaW5pc2goKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmV2ZW50LnRyaWdnZXIoJ3JlbmRlckNvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYXJlYSc6XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkluc3RhbmNlID0gbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgdGltaW5nOiAnZWFzZUluJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgb25Qcm9jZXNzOiBmdW5jdGlvbiBvblByb2Nlc3MocHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBkcmF3WUF4aXNHcmlkKG9wdHMsIGNvbmZpZywgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kcmF3QXJlYURhdGFQb2ludHMgPSBkcmF3QXJlYURhdGFQb2ludHMoc2VyaWVzLCBvcHRzLCBjb25maWcsIGNvbnRleHQsIHByb2Nlc3MpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeEF4aXNQb2ludHMgPSBfZHJhd0FyZWFEYXRhUG9pbnRzLnhBeGlzUG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsUG9pbnRzID0gX2RyYXdBcmVhRGF0YVBvaW50cy5jYWxQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlYWNoU3BhY2luZyA9IF9kcmF3QXJlYURhdGFQb2ludHMuZWFjaFNwYWNpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2hhcnREYXRhLnhBeGlzUG9pbnRzID0geEF4aXNQb2ludHM7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoYXJ0RGF0YS5jYWxQb2ludHMgPSBjYWxQb2ludHM7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoYXJ0RGF0YS5lYWNoU3BhY2luZyA9IGVhY2hTcGFjaW5nO1xuICAgICAgICAgICAgICAgICAgICBkcmF3WEF4aXMoY2F0ZWdvcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0xlZ2VuZChvcHRzLnNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1lBeGlzKHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1Rvb2xUaXBCcmlkZ2Uob3B0cywgY29uZmlnLCBjb250ZXh0LCBwcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0NhbnZhcyhvcHRzLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQW5pbWF0aW9uRmluaXNoOiBmdW5jdGlvbiBvbkFuaW1hdGlvbkZpbmlzaCgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZXZlbnQudHJpZ2dlcigncmVuZGVyQ29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyaW5nJzpcbiAgICAgICAgY2FzZSAncGllJzpcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uSW5zdGFuY2UgPSBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICB0aW1pbmc6ICdlYXNlSW5PdXQnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBvblByb2Nlc3M6IGZ1bmN0aW9uIG9uUHJvY2Vzcyhwcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoYXJ0RGF0YS5waWVEYXRhID0gZHJhd1BpZURhdGFQb2ludHMoc2VyaWVzLCBvcHRzLCBjb25maWcsIGNvbnRleHQsIHByb2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICBkcmF3TGVnZW5kKG9wdHMuc2VyaWVzLCBvcHRzLCBjb25maWcsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBkcmF3Q2FudmFzKG9wdHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25BbmltYXRpb25GaW5pc2g6IGZ1bmN0aW9uIG9uQW5pbWF0aW9uRmluaXNoKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ldmVudC50cmlnZ2VyKCdyZW5kZXJDb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JhZGFyJzpcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uSW5zdGFuY2UgPSBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICB0aW1pbmc6ICdlYXNlSW5PdXQnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBvblByb2Nlc3M6IGZ1bmN0aW9uIG9uUHJvY2Vzcyhwcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoYXJ0RGF0YS5yYWRhckRhdGEgPSBkcmF3UmFkYXJEYXRhUG9pbnRzKHNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0LCBwcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0xlZ2VuZChvcHRzLnNlcmllcywgb3B0cywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0NhbnZhcyhvcHRzLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQW5pbWF0aW9uRmluaXNoOiBmdW5jdGlvbiBvbkFuaW1hdGlvbkZpbmlzaCgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZXZlbnQudHJpZ2dlcigncmVuZGVyQ29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuLy8gc2ltcGxlIGV2ZW50IGltcGxlbWVudFxuXG5mdW5jdGlvbiBFdmVudCgpIHtcblx0dGhpcy5ldmVudHMgPSB7fTtcbn1cblxuRXZlbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dGhpcy5ldmVudHNbdHlwZV0gPSB0aGlzLmV2ZW50c1t0eXBlXSB8fCBbXTtcblx0dGhpcy5ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG59O1xuXG5FdmVudC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uICgpIHtcblx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHR9XG5cblx0dmFyIHR5cGUgPSBhcmdzWzBdO1xuXHR2YXIgcGFyYW1zID0gYXJncy5zbGljZSgxKTtcblx0aWYgKCEhdGhpcy5ldmVudHNbdHlwZV0pIHtcblx0XHR0aGlzLmV2ZW50c1t0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bGlzdGVuZXIuYXBwbHkobnVsbCwgcGFyYW1zKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcblxudmFyIENoYXJ0cyA9IGZ1bmN0aW9uIENoYXJ0cyhvcHRzKSB7XG4gICAgb3B0cy50aXRsZSA9IG9wdHMudGl0bGUgfHwge307XG4gICAgb3B0cy5zdWJ0aXRsZSA9IG9wdHMuc3VidGl0bGUgfHwge307XG4gICAgb3B0cy55QXhpcyA9IG9wdHMueUF4aXMgfHwge307XG4gICAgb3B0cy54QXhpcyA9IG9wdHMueEF4aXMgfHwge307XG4gICAgb3B0cy5leHRyYSA9IG9wdHMuZXh0cmEgfHwge307XG4gICAgb3B0cy5sZWdlbmQgPSBvcHRzLmxlZ2VuZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgb3B0cy5hbmltYXRpb24gPSBvcHRzLmFuaW1hdGlvbiA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgdmFyIGNvbmZpZyQkMSA9IGFzc2lnbih7fSwgY29uZmlnKTtcbiAgICBjb25maWckJDEueUF4aXNUaXRsZVdpZHRoID0gb3B0cy55QXhpcy5kaXNhYmxlZCAhPT0gdHJ1ZSAmJiBvcHRzLnlBeGlzLnRpdGxlID8gY29uZmlnJCQxLnlBeGlzVGl0bGVXaWR0aCA6IDA7XG4gICAgY29uZmlnJCQxLnBpZUNoYXJ0TGluZVBhZGRpbmcgPSBvcHRzLmRhdGFMYWJlbCA9PT0gZmFsc2UgPyAwIDogY29uZmlnJCQxLnBpZUNoYXJ0TGluZVBhZGRpbmc7XG4gICAgY29uZmlnJCQxLnBpZUNoYXJ0VGV4dFBhZGRpbmcgPSBvcHRzLmRhdGFMYWJlbCA9PT0gZmFsc2UgPyAwIDogY29uZmlnJCQxLnBpZUNoYXJ0VGV4dFBhZGRpbmc7XG5cbiAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnJCQxO1xuICAgIHRoaXMuY29udGV4dCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQob3B0cy5jYW52YXNJZCk7XG4gICAgLy8gc3RvcmUgY2FsY3VhdGVkIGNoYXJ0IGRhdGFcbiAgICAvLyBzdWNoIGFzIGNoYXJ0IHBvaW50IGNvb3JkaW5hdGVcbiAgICB0aGlzLmNoYXJ0RGF0YSA9IHt9O1xuICAgIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnQoKTtcbiAgICB0aGlzLnNjcm9sbE9wdGlvbiA9IHtcbiAgICAgICAgY3VycmVudE9mZnNldDogMCxcbiAgICAgICAgc3RhcnRUb3VjaFg6IDAsXG4gICAgICAgIGRpc3RhbmNlOiAwXG4gICAgfTtcblxuICAgIGRyYXdDaGFydHMuY2FsbCh0aGlzLCBvcHRzLnR5cGUsIG9wdHMsIGNvbmZpZyQkMSwgdGhpcy5jb250ZXh0KTtcbn07XG5cbkNoYXJ0cy5wcm90b3R5cGUudXBkYXRlRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICB0aGlzLm9wdHMuc2VyaWVzID0gZGF0YS5zZXJpZXMgfHwgdGhpcy5vcHRzLnNlcmllcztcbiAgICB0aGlzLm9wdHMuY2F0ZWdvcmllcyA9IGRhdGEuY2F0ZWdvcmllcyB8fCB0aGlzLm9wdHMuY2F0ZWdvcmllcztcblxuICAgIHRoaXMub3B0cy50aXRsZSA9IGFzc2lnbih7fSwgdGhpcy5vcHRzLnRpdGxlLCBkYXRhLnRpdGxlIHx8IHt9KTtcbiAgICB0aGlzLm9wdHMuc3VidGl0bGUgPSBhc3NpZ24oe30sIHRoaXMub3B0cy5zdWJ0aXRsZSwgZGF0YS5zdWJ0aXRsZSB8fCB7fSk7XG5cbiAgICBkcmF3Q2hhcnRzLmNhbGwodGhpcywgdGhpcy5vcHRzLnR5cGUsIHRoaXMub3B0cywgdGhpcy5jb25maWcsIHRoaXMuY29udGV4dCk7XG59O1xuXG5DaGFydHMucHJvdG90eXBlLnN0b3BBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hbmltYXRpb25JbnN0YW5jZSAmJiB0aGlzLmFuaW1hdGlvbkluc3RhbmNlLnN0b3AoKTtcbn07XG5cbkNoYXJ0cy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuICAgIHRoaXMuZXZlbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG59O1xuXG5DaGFydHMucHJvdG90eXBlLmdldEN1cnJlbnREYXRhSW5kZXggPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciB0b3VjaGVzID0gZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPyBlLnRvdWNoZXMgOiBlLmNoYW5nZWRUb3VjaGVzO1xuICAgIGlmICh0b3VjaGVzICYmIHRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBfdG91Y2hlcyQgPSB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgeCA9IF90b3VjaGVzJC54LFxuICAgICAgICAgICAgeSA9IF90b3VjaGVzJC55O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdHMudHlwZSA9PT0gJ3BpZScgfHwgdGhpcy5vcHRzLnR5cGUgPT09ICdyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRQaWVDaGFydEN1cnJlbnRJbmRleCh7IHg6IHgsIHk6IHkgfSwgdGhpcy5jaGFydERhdGEucGllRGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRzLnR5cGUgPT09ICdyYWRhcicpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kUmFkYXJDaGFydEN1cnJlbnRJbmRleCh7IHg6IHgsIHk6IHkgfSwgdGhpcy5jaGFydERhdGEucmFkYXJEYXRhLCB0aGlzLm9wdHMuY2F0ZWdvcmllcy5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRDdXJyZW50SW5kZXgoeyB4OiB4LCB5OiB5IH0sIHRoaXMuY2hhcnREYXRhLnhBeGlzUG9pbnRzLCB0aGlzLm9wdHMsIHRoaXMuY29uZmlnLCBNYXRoLmFicyh0aGlzLnNjcm9sbE9wdGlvbi5jdXJyZW50T2Zmc2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuQ2hhcnRzLnByb3RvdHlwZS5zaG93VG9vbFRpcCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIG9wdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBpZiAodGhpcy5vcHRzLnR5cGUgPT09ICdsaW5lJyB8fCB0aGlzLm9wdHMudHlwZSA9PT0gJ2FyZWEnKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0Q3VycmVudERhdGFJbmRleChlKTtcbiAgICAgICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB0aGlzLnNjcm9sbE9wdGlvbi5jdXJyZW50T2Zmc2V0O1xuXG4gICAgICAgIHZhciBvcHRzID0gYXNzaWduKHt9LCB0aGlzLm9wdHMsIHtcbiAgICAgICAgICAgIF9zY3JvbGxEaXN0YW5jZV86IGN1cnJlbnRPZmZzZXQsXG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdmFyIHNlcmllc0RhdGEgPSBnZXRTZXJpZXNEYXRhSXRlbSh0aGlzLm9wdHMuc2VyaWVzLCBpbmRleCk7XG4gICAgICAgICAgICBpZiAoc2VyaWVzRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBkcmF3Q2hhcnRzLmNhbGwodGhpcywgb3B0cy50eXBlLCBvcHRzLCB0aGlzLmNvbmZpZywgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIF9nZXRUb29sVGlwRGF0YSA9IGdldFRvb2xUaXBEYXRhKHNlcmllc0RhdGEsIHRoaXMuY2hhcnREYXRhLmNhbFBvaW50cywgaW5kZXgsIHRoaXMub3B0cy5jYXRlZ29yaWVzLCBvcHRpb24pLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0TGlzdCA9IF9nZXRUb29sVGlwRGF0YS50ZXh0TGlzdCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gX2dldFRvb2xUaXBEYXRhLm9mZnNldDtcblxuICAgICAgICAgICAgICAgIG9wdHMudG9vbHRpcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dExpc3Q6IHRleHRMaXN0LFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uOiBvcHRpb25cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRyYXdDaGFydHMuY2FsbCh0aGlzLCBvcHRzLnR5cGUsIG9wdHMsIHRoaXMuY29uZmlnLCB0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhd0NoYXJ0cy5jYWxsKHRoaXMsIG9wdHMudHlwZSwgb3B0cywgdGhpcy5jb25maWcsIHRoaXMuY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5DaGFydHMucHJvdG90eXBlLnNjcm9sbFN0YXJ0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50b3VjaGVzWzBdICYmIHRoaXMub3B0cy5lbmFibGVTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxPcHRpb24uc3RhcnRUb3VjaFggPSBlLnRvdWNoZXNbMF0ueDtcbiAgICB9XG59O1xuXG5DaGFydHMucHJvdG90eXBlLnNjcm9sbCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gVE9ETyB0aHJvdHRpbmcuLi5cbiAgICBpZiAoZS50b3VjaGVzWzBdICYmIHRoaXMub3B0cy5lbmFibGVTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgdmFyIF9kaXN0YW5jZSA9IGUudG91Y2hlc1swXS54IC0gdGhpcy5zY3JvbGxPcHRpb24uc3RhcnRUb3VjaFg7XG4gICAgICAgIHZhciBjdXJyZW50T2Zmc2V0ID0gdGhpcy5zY3JvbGxPcHRpb24uY3VycmVudE9mZnNldDtcblxuICAgICAgICB2YXIgdmFsaWREaXN0YW5jZSA9IGNhbFZhbGlkRGlzdGFuY2UoY3VycmVudE9mZnNldCArIF9kaXN0YW5jZSwgdGhpcy5jaGFydERhdGEsIHRoaXMuY29uZmlnLCB0aGlzLm9wdHMpO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsT3B0aW9uLmRpc3RhbmNlID0gX2Rpc3RhbmNlID0gdmFsaWREaXN0YW5jZSAtIGN1cnJlbnRPZmZzZXQ7XG4gICAgICAgIHZhciBvcHRzID0gYXNzaWduKHt9LCB0aGlzLm9wdHMsIHtcbiAgICAgICAgICAgIF9zY3JvbGxEaXN0YW5jZV86IGN1cnJlbnRPZmZzZXQgKyBfZGlzdGFuY2UsXG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRyYXdDaGFydHMuY2FsbCh0aGlzLCBvcHRzLnR5cGUsIG9wdHMsIHRoaXMuY29uZmlnLCB0aGlzLmNvbnRleHQpO1xuICAgIH1cbn07XG5cbkNoYXJ0cy5wcm90b3R5cGUuc2Nyb2xsRW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAodGhpcy5vcHRzLmVuYWJsZVNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICB2YXIgX3Njcm9sbE9wdGlvbiA9IHRoaXMuc2Nyb2xsT3B0aW9uLFxuICAgICAgICAgICAgY3VycmVudE9mZnNldCA9IF9zY3JvbGxPcHRpb24uY3VycmVudE9mZnNldCxcbiAgICAgICAgICAgIGRpc3RhbmNlID0gX3Njcm9sbE9wdGlvbi5kaXN0YW5jZTtcblxuICAgICAgICB0aGlzLnNjcm9sbE9wdGlvbi5jdXJyZW50T2Zmc2V0ID0gY3VycmVudE9mZnNldCArIGRpc3RhbmNlO1xuICAgICAgICB0aGlzLnNjcm9sbE9wdGlvbi5kaXN0YW5jZSA9IDA7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGFydHM7XG4iXX0=