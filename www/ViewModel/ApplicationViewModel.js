function ApplicationViewModel() {
  /// <summary>
  /// The view model that manages the view model back-stack
  /// </summary>
  
  // --- properties
  var that = this;
  this.viewModelBackStack = ko.observableArray();

  this.backButtonRequired = ko.dependentObservable(function () {    
    return this.viewModelBackStack().length > 1;
  }, this);

  // --- functions

  this.navigateTo = function (viewModel) {
	this.uniquestack(viewModel);
  };

  this.back = function () {
    this.viewModelBackStack.pop();
	$('.app #main:last-child').css('display','block');
  };

  this.uniquestack = function(viewModel){
    var stack = [];
    stack = $.grep(that.viewModelBackStack(), function (value) {
      return value.template != viewModel.template;
    });
    that.viewModelBackStack.removeAll();
    $.each(stack, function () {
        that.viewModelBackStack.push(this);
    });
    that.viewModelBackStack.push(viewModel);
	$('.app #main:last-child').css('display','block');
  };

  this.templateSelector = function (viewModel) {
    return viewModel.template;
  };
}