function Matrix(i){
	this.values = i || [];
	this.getLength = function(i){
		var last = this.values;
		for(var k = 0; k < i; k++){
			if(last[0] instanceof Array){ last = last[0]; }
			else return 0;
		}
		return last.length;
	};
	
	this.createIdentity = function(i){
		var identity = [];
		for(var y = 0; y < i; y++){
			identity[y] = [];
			for(var x = 0; x < i; x++){
				identity[y][x] = (x == y)|0;
			}
		}
		this.values = identity;
		return this;
	};

	this.add = function(a){
		var l0x = this.getLength(1),
				l0y = this.getLength(0);

		var l1x = a.getLength(1),
				l1y = a.getLength(0);

		if(l0y == l1y && l0x == l1x){
			for (var y = 0; y < l0y; y++){
				for (var x = 0; x < l0x; x++){
					this.values[y][x] += a.values[y][x];
				}
			}
		}
		return this;
	}

	this.subtract = function(a){
		var l0x = this.getLength(1),
				l0y = this.getLength(0);

		var l1x = a.getLength(1),
				l1y = a.getLength(0);

		if(l0y == l1y && l0x == l1x){
			for (var y = 0; y < l0y; y++){
				for (var x = 0; x < l0x; x++){
					this.values[y][x] -= a.values[y][x];
				}
			}
		}
		return this;
	}

	this.multiply = function(a){
		var l0x = this.getLength(1),
				l0y = this.getLength(0);

		var l1x = a.getLength(1),
				l1y = a.getLength(0);

		if (l0x == l1y){
			var result = [];
			for(var j = 0; j < l0y; j++){ result[j] = []; }
			for (var y = 0; y < l1x; y++)
			{
				for (var x = 0; x < l0y; x++)
				{
					var total = 0;
					for (var k = 0; k < l0y; k++)
					{
						total += this.values[x][k] * a.values[k][y];
					}
					result[x][y] = total;
				}
			}
			this.values = result;
		}
		return this;
	}

	this.flipLR = function(){
		var lx = (this.getLength(1)/2) | 0,
				ly = this.getLength(0);
		for (var y = 0; y < ly; y++){
			for (var x = 0; x < lx; x++)
			{
				var v0 = this.values[y][x];
				var v1 = this.values[y][lx - x + 1];
				this.values[y][x] = v1;
				this.values[y][lx - x + 1] = v0;
			}
		}
		return this;
	}
	
	this.flipTB = function(){
		var lx = this.getLength(1),
				ly = (this.getLength(0)/2) | 0;
		for (var y = 0; y < ly; y++){
			for (var x = 0; x < lx; x++)
			{
				var v0 = this.values[y][x];
				var v1 = this.values[ly - y + 1][x];
				this.values[y][x] = v1;
				this.values[ly - y + 1][x] = v0;
			}
		}
		return this;
	};
	
	this.transpose = function(){
		var lx = this.getLength(1),
				ly = this.getLength(0);
		var result = [];
		for(var j = 0; j < lx; j++){ result[j] = []; }
		if(lx == ly){
			for (var y = 0; y < ly; y++){
				result[y][y] = this.values[y][y];
				for (var x = y + 1; x < lx; x++){
					result[y][x] = this.values[x][y];
					result[x][y] = this.values[y][x];
				}
			}
		}else{
			for (var y = 0; y < ly; y++){
				for (var x = 0; x < lx; x++){
					result[y][x] = this.values[x][y];
				}
			}
		}
		this.values = result;
		return this;
	};
	
	// TODO: DETERMINANT!!!
	this.determinant = function(){
		
	};
	
	this.toString = function(){
		var text = "";
		for (var y = 0; y < this.getLength(0); y++){
			text += "| ";
			for (var x = 0; x < this.getLength(1); x++){
				text += this.values[y][x].toString() + " | ";
			}
			text += "\n";
		}
		return text;
	};
}
