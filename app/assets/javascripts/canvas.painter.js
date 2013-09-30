var CanvasPainter = {
	canvas : $("canvas"),
	x	   : 200,
	y      : 200,
	radius : 200,
	intervalTimer: null,
	initialize: function(x,y,r) {
		this.x 		= x;
		this.y 		= y;
		this.radius = r;
		this.canvas = $("canvas");
		this.listen()
	},
	listen : function() {
      $("form").on('submit', function(event) {
      	event.preventDefault();
      	CanvasPainter.reset_canvas();
      	var _form = $(this),
      		interval = _form.find("#interval").val(),
      		sample_size = _form.find("#sample").val();
      	CanvasPainter.paint(interval, sample_size);		
      });  
	},
	paint: function(interval, sample_size) {

		var _this = CanvasPainter;
		_this.count = _this.total = parseInt(sample_size);
		$("#paint_progress .bar").width("0%");	
		$.doTimeout( 'painter', parseInt(interval), function(){
		  if(_this.count > 0) {
		    _this.get_point();
		    $("#paint_progress .bar").width(_this.progress()*100 + "%");	
		  }
		  else {
		  	return false;
		  }
		    _this.count -= 1;
		    return true;	
 		  
		});
	},
	progress: function() {
		return ((this.total-this.count)/this.total);
	},
	get_point: function() {
		$.ajax({
  			url: "/random_point",
  			cache: false
  		})
  		.done(function( response ) {
    		CanvasPainter.draw_point(response.x, response.y);
  		});
	},
	draw_point: function(x1,y1) {
		$("canvas").drawEllipse({
		  fillStyle: "#000",
		  x: x1, y: y1,
		  width: 2, height: 2
		});
	},
	reset_canvas : function() {
	  CanvasPainter.canvas.clearCanvas();
	  CanvasPainter.canvas.drawEllipse({
	    fillStyle: "#3AA3F0",
	    x: CanvasPainter.x, y: CanvasPainter.y,
	    width: CanvasPainter.radius*2, height: CanvasPainter.radius*2
	  });
	}	

};
