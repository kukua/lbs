(function(kukua) {
	'use strict';
	kukua.onDomReady = function() {

		//Initializations
		kukua.datePickerInit()
		kukua.datePickerCallback(moment(), moment())

		//bind onChange reload graph
		kukua.formChanges()
		kukua.graph()
	};

	kukua.datePickerInit = function() {
		kukua.getDateRangePicker().daterangepicker({
			ranges: kukua.getDatePickerRanges()
		}, kukua.datePickerCallback)
	};

	kukua.getDatePickerRanges = function() {
		return {
		   'Today': [moment().startOf('day'), moment().endOf('day')],
		   'Tomorrow': [moment().add(1, 'days').startOf('day'), moment().add(1, 'days').endOf('day')],
		   'Yesterday': [moment().subtract(1, 'day').startOf('day'), moment().subtract(1, 'day').endOf('day')],
		   'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
		   'Last 30 Days': [moment().subtract(30, 'days').startOf('day'), moment().endOf('day')]
		}
	};

	kukua.datePickerCallback = function(start, end) {
		var startDate = start.startOf('day')
		var endDate   = end.endOf('day')

		kukua.getDateRangePickerSpan().html(startDate.format('DD-MM-YYYY') + ' - ' + endDate.format('DD-MM-YYYY'))
		$('input#dateFrom').val(startDate.format("X"))
		$('input#dateTo').val(endDate.format("X"))
	};

	kukua.graph = function() {
		var graphCountry	= kukua.getGraphCountry()
		var graphType		= kukua.getGraphType()
		var graphTypeText	= kukua.getGraphTypeText()
		var graphInterval	= kukua.getGraphInterval()

		var options = chart.getOptions()
		options.chart.zoomType = 'x'
		options.title.text = graphTypeText

		var item = graphType.find(":selected").data('text');
		switch(item) {
			case 'Temperature':
				options.chart.type = "line"
				options.yAxis.title.text = graphTypeText + " (°C)"
				options.tooltip.valueSuffix = '°C'
				break
			case 'Humidity':
				options.chart.type = "line"
				options.yAxis.title.text = graphTypeText + " (%)"
				options.tooltip.valueSuffix = ' (%)'
				break
			case 'Pressure':
				options.chart.type = "line"
				options.yAxis.title.text = graphTypeText + " (hPa)"
				options.tooltip.valueSuffix = ' (hPa)'
				break
			case 'Rainfall':
				options.chart.type = "column"
				options.yAxis.title.text = graphTypeText + " (mm)"
				options.tooltip.valueSuffix = ' mm'
				break
			case 'Wind':
				options.chart.type = "line"
				options.yAxis.title.text = graphTypeText + " (km/h)"
				options.tooltip.valueSuffix = ' km/h'
				break;
		}
		chart.render("#chart", "/ajax.php", options)
	};

	kukua.datePickerChange = function() {
		kukua.getDateRangePicker().on("apply.daterangepicker", function(ev, picker) {
			kukua.graph()
		})
	};

	kukua.formChanges = function() {
		kukua.datePickerChange();
		kukua.getGraphInterval().on("change", function() {
			kukua.graph()
		})
		kukua.getGraphType().on("change", function() {
			kukua.graph()
		})
	};

	kukua.getGraphCountry = function() {
		return $("#js-graph-country")
	};
	kukua.getGraphInterval = function() {
		return $('#js-graph-show-per')
	};
	kukua.getGraphType = function() {
		return $("#js-graph-type-swap")
	};
	kukua.getGraphTypeText = function() {
		var input = kukua.getGraphType()
		return input.find("option:selected").text()
	};
	kukua.getDateRangePicker = function() {
		return $("#reportrange")
	};
	kukua.getDateRangePickerSpan = function() {
		return $("#reportrange span")
	};

})(window.kukua = window.kukua || {});
$(document).ready(kukua.onDomReady);
