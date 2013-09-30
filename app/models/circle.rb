class Circle
	attr_accessor :radius, :center, :diameter
	DEFAULT_ATTR = {r: 200, x: 200, y:200}

	def initialize(*args)
		options 		= args.extract_options!
		@radius 		= options[:r].to_i || DEFAULT_ATTR[:r]
		@diameter 		= @radius*2
		h 				= options[:h].to_i || DEFAULT_ATTR[:x]
		v 				= options[:v].to_i || DEFAULT_ATTR[:y]
		@center 		= Point.new(h,v)
	end

	def point_at(theta, radial_dist)
		x 				= (@radius*radial_dist)*Math.cos(theta)+@center.x
		y 				= (@radius*radial_dist)*Math.sin(theta)+@center.y
		Point.new(x,y)
	end

	def random_point
		theta 			= 2*Math::PI*rand()
		puts theta
		radial_dist 	= rand()+rand() # Adds uniformity
		radial_dist 	= 2-radial_dist if radial_dist>1
		point_at(theta, radial_dist)
	end	
end