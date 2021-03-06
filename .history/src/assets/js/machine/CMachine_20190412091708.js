/*//
title:中国象棋基础函数与常量
author:aspwebchh
date:2013/2/12
//*/

var BOARD = [
	[ 2, 3, 6, 5, 1, 5, 6, 3, 2],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 4, 0, 0, 0, 0, 0, 4, 0],
	[ 7, 0, 7, 0, 7, 0, 7, 0, 7],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[14, 0,14, 0,14, 0,14, 0,14],
	[ 0,11, 0, 0, 0, 0, 0,11, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 9,10,13,12, 8,12,13,10, 9]
]

var PERSON = 1;
var MACHINE = 0;


//没有棋子
var NOCHESS = 0;
//黑帅
var B_KING = 1; 
//黑车
var B_CAR = 2; 
//黑马
var B_HORSE = 3;
//黑炮
var B_CANON = 4;
//黑士
var B_BISHOP = 5;
//黑象
var B_ELEPHANT = 6;
//黑兵
var B_PAWN = 7;
var B_BIGIN = B_KING;
var B_END = B_PAWN;

//红将
var R_KING = 8; 
//红车
var R_CAR = 9; 
//红马
var R_HORSE = 10; 
//红炮
var R_CANON = 11;
//红士
var R_BISHOP = 12;
//红相
var R_ELEPHANT = 13;
//红兵
var R_PAWN = 14;
var R_BIGIN = R_KING;
var R_END = R_PAWN;

function isBlack( b ) {
	return b >= B_BIGIN && b <= B_END; 
}

function isRed( r ) {
	return r >= R_BIGIN && r <= R_END;
}

function isSameSide( x, y ) {
	return isBlack( x ) && isBlack( y ) || isRed( x ) && isRed( y );
}

function ChessPoint( x, y ) {
	this.x = x;
	this.y = y;
}

function ChessMove(  chess, from, to, score ) {
	this.chess = chess;
	this.from = from;
	this.to = to;
	this.score = score;
}

/*//
title:中国象棋走法产生类
author:aspwebchh
date:2013/2/12
//*/


function isValidMove( board, from, to ) {
	var chess;
	var target;

	//原地走棋
	if( from.x == to.x && from.y == to.y ) {
		return false;
	}	

	chess = board[ from.y ][ from.x ];
	target = board[ to.y ][ to.x ];

	//自己吃自已
	if( isSameSide( chess, target ) ) {
		return false;
	}

	switch( chess ) {
		//黑将
		case B_KING:
			if( target == R_KING ) {
				if( from.x != to.x ) {
					return false;
				}

				for (var i = from.y + 1; i < to.y; i++) {
					if( board[ i ][ from.x ] != NOCHESS ) {
						return false;
					} 
				};
			} else {
				if( to.y > 2 || to.x > 5 || to.x < 3 )	{
					return false;
				}

				if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
					return false;
				}
			}
			break;

		//红将
		case R_KING:
			if( target == B_KING ) {
				if( from.x != to.x ) {
					return false;
				}

				for (var i = from.y - 1; i > to.y; i--) {
					if( board[ i ][ from.x ]  != NOCHESS ) {
						return false;
					}
				};
			} else {
				if( to.y < 7 || to.x > 5 || to.x < 3 ) {
					return false;
				}

				if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
					return false;
				}
			}
			break;


		//红士
		case R_BISHOP: 
      //console.log( to )
			if( to.y < 7 || to.x < 3 || to.x > 5 ) {
        //console.log( 'p' )
				return false;
			}

			if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
				return false;
			}
			break;
		
		//黑士
		case B_BISHOP:
			if( to.y > 2 || to.x < 3 || to.x > 5 ) {
				return false;
			}

			if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
				return false;
			}
			break;

		//红相
		case R_ELEPHANT:
			if( to.y < 5 ) {
				return false;
			}

			if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
				return false;
			}

			if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
				return false;
			}
			break;

		//黑相
		case B_ELEPHANT:
			if( to.y > 4 ) {
				return false;
			}

			if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
				return false;
			}

			if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
				return false;
			}
			break;

		//黑兵	
		case B_PAWN:
			if( to.y < from.y ) {
				return false;
			}

			if( from.y < 5 && from.y == to.y ) {
				return false;
			}

			if( to.y - from.y + Math.abs( to.x - from.x ) > 1 ) {
				return false;
			}
			break;

		//红兵	
		case R_PAWN:
			if( to.y > from.y ) {
				return false;
			}

			if( from.y > 4 && from.y == to.y ) {
				return false;
			}

			if( from.y - to.y + Math.abs( from.x - to.x ) > 1 ) {
				return false;
			}
			break;

		//车
		case B_CAR:
		case R_CAR:
			if( from.y != to.y && from.x != to.x ) {
				return false;
			}

			if( from.y == to.y ) {
				if( from.x < to.x ) {
					for( var i = from.x + 1; i < to.x; i++ ) {
						if( board[ from.y ][ i ] != NOCHESS ) {
							return false;
						}
					}
				} else {
					for( var i = to.x + 1; i < from.x; i++ ) {
						if( board[ from.y ][ i ] != NOCHESS ) {
							return false;
						}
					}
				}
			} else {
				if( from.y < to.y ) {
					for( var i = from.y + 1; i < to.y; i++ ) {
						if( board[ i ][ from.x ] != NOCHESS ) {
							return false;
						}
					}
				} else {
					for( var i = to.y + 1; i < from.y; i++ ) {
						if( board[ i ][ from.x ] != NOCHESS ) {
							return false;
						}
					}
				}
			}
			break;

		//马
		case B_HORSE:
		case R_HORSE:
			if( !( Math.abs( from.x - to.x ) == 1 && Math.abs( from.y - to.y ) == 2 || 
				Math.abs( from.x - to.x ) == 2 && Math.abs( from.y - to.y ) == 1 ) ) {
				return false;
			}

			if( to.x - from.x == 2 ) {
				i = from.x + 1;
				j = from.y;
			} else if( from.x - to.x == 2 ) {
				i = from.x - 1;
				j = from.y;
			} else if( to.y - from.y == 2 ) {
				i = from.x;
				j = from.y + 1;
			} else if( from.y - to.y == 2 ) {
				i = from.x;
				j = from.y - 1;
			}

			if( board[ j ][ i ] != NOCHESS ) {
				return false;
			}
			break;

		//炮
		case B_CANON:
		case R_CANON:
			if( from.y != to.y && from.x != to.x ) {
				return false;
			}

			if( target == NOCHESS ) {
				if( from.y == to.y ) {
					if( from.x < to.x ) {
						for( var i = from.x + 1; i < to.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.x + 1; i < from.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						} 
					}
				} else {
					if( from.y < to.y ) {
						for( var i = from.y + 1; i < to.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.y + 1; i < from.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					}
				}
			} else {
				var count = 0;

				if( from.y == to.y ) {
					if( from.x < to.x ) {
						for( var i = from.x + 1; i < to.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								count++; 
							}
						}
						if( count != 1 ) {
							return false;
						}
					} else {
						for( var i = to.x + 1; i < from.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								count++;
							}
						}
						if( count != 1 ) {
							return false;
						}
					}
				} else {
					if( from.y < to.y ) {
						for( var i = from.y + 1; i < to.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								count++;
							}
						}  
						if( count != 1 ) {
							return false;
						}
					} else {
						for( var i = to.y + 1; i < from.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								count++;
							}
						}
						if( count != 1 ) {
							return false;
						}
					}
				}
			}
 	}
  return true;
}

var MoveGenerator = function() {
	var moveList;
	var moveCount;

    this.getMoveList = function() {
      return moveList;
    }

    this.getMoveList = function( depth, count ) {
      var tmp = [];
      for( var i = 0; i < count; i++ ) {
        tmp[ i ] = moveList[ depth ][ i ];
      }
      return tmp;
    }
 
    this.createPossibleMove = function( board, ply, side ) {
    	moveCount = 0;
    	for( var i = 0; i < 10; i++ ) {
    		for( var j = 0; j < 9; j++ ) {
    			if( board[ i ][ j ] != NOCHESS ) {
    				var chess = board[ i ][ j ];

    				if( side == 0 && isRed( chess ) ) {
    					continue;
    				}

    				if( side == 1 && isBlack( chess ) ) {
    					continue;
    				}

    				switch( chess ) {
    					case R_KING:
    					case B_KING:
    						GenKingMove( board, i, j, ply );
    						break;
    					case R_BISHOP:
    						GenRBishopMove( board, i, j, ply );
    						break;
    					case B_BISHOP:
    						GenBBishopMove( board, i, j, ply );
    						break;
    					case R_ELEPHANT:
    					case B_ELEPHANT:
    						GenElephantMove( board, i, j, ply );
    						break;
    					case R_HORSE:
    					case B_HORSE:
    						GenHorseMove( board, i, j, ply );
    						break;
    					case B_CAR:
    					case R_CAR:
    						GenCarMove( board, i, j, ply );
    						break;
    					case R_PAWN:
    						GenRPawnMove( board, i, j, ply );
    						break;
    					case B_PAWN:
    						GenBPawnMove( board, i, j, ply );
    						break;
    					case B_CANON:
    					case R_CANON:
    						GenCanonMove( board, i, j, ply );
    						break;
    					default:
    						alert( '无此棋子' ) ;
    				}
    			}
    		}
    	}
    	return moveCount;
    }

    var GenKingMove = function( board, i, j, ply ) {
    	var from = new ChessPoint( j, i );

    	for( var x = 0 ; x < 3; x++ ) {
    		for( var y = 3; y < 6; y++ ) {
    			var to = new ChessPoint( y, x );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}

    	for( var x = 7; x < 10; x++ ) {
    		for( var y = 3; y < 6; y ++ ) {
    			var  to = new ChessPoint( y, x );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}
    }

    var GenRBishopMove = function( board, i, j, ply ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 7; y < 10; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}
    }

    var GenBBishopMove = function( board, i, j, ply ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 0; y < 3; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}
    }

    var GenElephantMove = function( board, i, j, ply ) {
    	var x;
    	var y;
    	var from;
    	var to;

    	from = new ChessPoint( j, i );

    	x = j + 2;
    	y = i + 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y < 10 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}

    	x = j + 2;
    	y = i - 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y >=0 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}

    	x = j - 2;
    	y = i + 2;
      to = new ChessPoint( x, y );
    	if( x >= 0 && y < 10 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}

    	x = j - 2;
    	y = i - 2;
      to = new ChessPoint( x, y );
    	if( x >= 0 && y >= 0 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}
    }

   var GenHorseMove = function( board, i, j, ply ) {
   		var x;
   		var y;
   		var from;
   		var to;
   		from = new ChessPoint( j, i );

   		x = j + 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j + 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}


   		x = j + 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j + 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}   		
   }

   var GenBPawnMove = function( board, i, j, ply ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];
       var from = new ChessPoint( j, i );

   	   x = j;
   	   y = i + 1;

   	   if( y < 10 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   		addMove( from, new ChessPoint( x, y ), ply );
   	   }	

   	   if( i > 4 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}
    	 }
   }

   var GenRPawnMove = function( board, i, j, ply ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];
       var from = new ChessPoint( j, i );

   	   x = j;
   	   y = i - 1;

   	   if( y >= 0 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   		addMove( from, new ChessPoint( x, y ), ply );
   	   }	

   	   if( i < 5 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}
    	 }   		
   }

   var GenCarMove = function( board, i, j, ply ) {
   		var x;
   		var y;
   		var chess = board[ i ][ j ];
      var from = new ChessPoint( j, i );

   		y = i;
   		x = j + 1;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			x++;
   		}

     	y = i;
   		x = j - 1;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			x--;
   		} 	

      	y = i + 1;
   		x = j;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			y++;
   		} 	

      	y = i - 1;
   		x = j;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			y--;
   		} 	   	
   }

   var GenCanonMove = function( board, i, j, ply ) {
   		var x;
   		var y;
   		var flag;
   		var chess = board[ i ][ j ];
      var from = new ChessPoint( j, i );

   		x = j + 1;
   		y = i;
   		flag = false;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			x++;
   		}

   		x = j - 1;
   		y = i;
   		flag = false;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			x--;
   		}

   		x = j;
   		y = i + 1;
   		flag = false;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			y++;
   		}   		

   		x = j;
   		y = i - 1;
   		flag = false;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			y--;
   		}    		   		
   }

    var addMove = function( from, to, ply ) {
    	var move = moveList[ ply ][ moveCount ];
      move.from = from;
    	move.to = to;
    	return ++moveCount;
    }

	var initialize = function() {
		moveList = [];
		moveCount = 0;

		for( var i = 0; i < 8; i++ ) {
			moveList.push( [] );
			for( var j = 0; j < 80; j++ ) {
				moveList[ i ][ j ] = new ChessMove();
			}
		}
	}

	initialize();
} 
/*//
title:中国象棋棋局评估类
author:aspwebchh
date:2013/2/12
//*/

var Evaluation = function() {
	//棋子的基本价值
	var BASEVALUE_PAWN = 100;
	var BASEVALUE_BISHOP = 250;
	var BASEVALUE_ELEPHANT = 250;
	var BASEVALUE_CAR = 500;
	var BASEVALUE_HORSE = 350;
	var BASEVALUE_CANON = 350;
	var BASEVALUE_KING = 10000;

	//棋子的灵活度
	var FLEXIBILITY_PAWN = 15; 
	var FLEXIBILITY_BISHOP = 1;
	var FLEXIBILITY_ELEPHANT = 1;
	var FLEXIBILITY_CAR = 6;
	var FLEXIBILITY_HORSE = 12; 
	var FLEXIBILITY_CANON = 6;
	var FLEXIBILITY_KING = 0;

	//基本价值分
	var baseValue;
	//灵活度分
	var flexValue;

	//被威胁信息
	var attackPos;
	//受保护信息
	var guardPos;
	//灵活性
	var flexibilityPos;
	//总价值
	var chessValue;

	//相关位置个数
	var posCount;
	//相关位置
	var relatePos;

	//红兵附加值
	var R_PAWN_VALUE = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 70, 90,110,110,110,110,110, 90, 70],
		[ 70, 70, 70, 70, 70, 70, 70, 70, 70],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0]
	]

	//黑兵附加值
	var B_PAWN_VALUE = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 70, 90,110,110,110,110,110, 90, 70],
		[ 70, 70, 70, 70, 70, 70, 70, 70, 70],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0]
	]

	var getPawnValue = function( x, y, board ) {
		if( board[ y ][ x ] == R_PAWN ) {
			return R_PAWN_VALUE[ y ][ x ];
		}

		if( board[ y ][ x ] == B_PAWN ) {
			return B_PAWN_VALUE[ y ][ x ];
		}

		return 0;
	}

	var resetData = function() {
		attackPos = [];
		guardPos = [];
		flexibilityPos = [];
		chessValue = [];

		for( var i = 0; i < 10; i++ ) {
			attackPos.push( [] );
			guardPos.push( [] );
			flexibilityPos.push( [] );
			chessValue.push( [] );

			for( var j = 0; j < 9; j++ ) {
				attackPos[ i ][ j ] = 0;
				guardPos[ i ][ j ] = 0;
				flexibilityPos[ i ][ j ] = 0;
				chessValue[ i ][ j ] = 0;
			}  
		}
	}

	var initialize = function() {
		//初始化存放信息的变量
		baseValue =[];
		flexValue = [];
		//resetData();
		relatePos = [];

		//初始化基本值数组
		baseValue[ B_KING ] = BASEVALUE_KING;
		baseValue[ B_CAR ] = BASEVALUE_CAR;
		baseValue[ B_HORSE ] = BASEVALUE_HORSE;
		baseValue[ B_BISHOP ] = BASEVALUE_BISHOP;
		baseValue[ B_ELEPHANT ] = BASEVALUE_ELEPHANT;
		baseValue[ B_CANON ] = BASEVALUE_CANON;
		baseValue[ B_PAWN ] = BASEVALUE_PAWN;

		baseValue[ R_KING ] = BASEVALUE_KING;
		baseValue[ R_CAR ] = BASEVALUE_CAR;
		baseValue[ R_HORSE ] = BASEVALUE_HORSE;
		baseValue[ R_BISHOP ] = BASEVALUE_BISHOP;
		baseValue[ R_ELEPHANT ] = BASEVALUE_ELEPHANT;
		baseValue[ R_CANON ] = BASEVALUE_CANON;
		baseValue[ R_PAWN ] = BASEVALUE_PAWN;

		flexValue[ B_KING ] = FLEXIBILITY_KING;
		flexValue[ B_CAR ] = FLEXIBILITY_CAR;
		flexValue[ B_HORSE ] = FLEXIBILITY_HORSE;
		flexValue[ B_BISHOP ] = FLEXIBILITY_BISHOP;
		flexValue[ B_ELEPHANT ] = FLEXIBILITY_ELEPHANT;
		flexValue[ B_CANON ] = FLEXIBILITY_CANON;
		flexValue[ B_PAWN ] = FLEXIBILITY_PAWN;

		flexValue[ R_KING ] = FLEXIBILITY_KING;
		flexValue[ R_CAR ] = FLEXIBILITY_CAR;
		flexValue[ R_HORSE ] = FLEXIBILITY_HORSE;
		flexValue[ R_BISHOP ] = FLEXIBILITY_BISHOP;
		flexValue[ R_ELEPHANT ] = FLEXIBILITY_ELEPHANT;
		flexValue[ R_CANON ] = FLEXIBILITY_CANON;
		flexValue[ R_PAWN ] = FLEXIBILITY_PAWN;
	}


	var addPoint = function( point ) {
		relatePos[ posCount ] = point;
		posCount++;	
	}


	var canTouch = function( board, from, to ) {
		var chess;
		var target;

		//原地走棋
		if( from.x == to.x && from.y == to.y ) {
			return false;
		}	
//alert(to.y)
		chess = board[ from.y ][ from.x ];
		target = board[ to.y ][ to.x ];

	/*//
		//自己吃自已
		if( isSameSide( chess, target ) ) {
			return false;
		}
	//*/

		switch( chess ) {
			//黑将
			case B_KING:
				if( target == R_KING ) {
					if( from.x != to.x ) {
						return false;
					}

					for (var i = from.y + 1; i < to.y; i++) {
						if( board[ i ][ from.x ] != NOCHESS ) {
							return false;
						} 
					};
				} else {
					if( to.y > 2 || to.x > 5 || to.x < 3 )	{
						return false;
					}

					if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
						return false;
					}
				}
				break;

			//红将
			case R_KING:
				if( target == B_KING ) {
					if( from.x != to.x ) {
						return false;
					}

					for (var i = from.y - 1; i > to.y; i--) {
						if( board[ i ][ from.x ]  != NOCHESS ) {
							return false;
						}
					};
				} else {
					if( to.y < 7 || to.x > 5 || to.x < 3 ) {
						return false;
					}

					if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
						return false;
					}
				}
				break;


			//红士
			case R_BISHOP: 
				if( to.y < 7 || to.x < 3 || to.x > 5 ) {
					return false;
				}

				if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
					return false;
				}
				break;
			
			//黑士
			case B_BISHOP:
				if( to.y > 2 || to.x < 3 || to.x > 5 ) {
					return false;
				}

				if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
					return false;
				}
				break;

			//红相
			case R_ELEPHANT:
				if( to.y < 5 ) {
					return false;
				}

				if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
					return false;
				}

				if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
					return false;
				}
				break;

			//黑相
			case B_ELEPHANT:
				if( to.y > 4 ) {
					return false;
				}

				if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
					return false;
				}

				if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
					return false;
				}
				break;

			//黑兵	
			case B_PAWN:
				if( to.y < from.y ) {
					return false;
				}

				if( from.y < 5 && from.y == to.y ) {
					return false;
				}

				if( to.y - from.y + Math.abs( to.x - from.x ) > 1 ) {
					return false;
				}
				break;

			//红兵	
			case R_PAWN:
				if( to.y > from.y ) {
					return false;
				}

				if( from.y > 4 && from.y == to.y ) {
					return false;
				}

				if( from.y - to.y + Math.abs( from.x - to.x ) > 1 ) {
					return false;
				}
				break;

			//车
			case B_CAR:
			case R_CAR:
				if( from.y != to.y && from.x != to.x ) {
					return false;
				}

				if( from.y == to.y ) {
					if( from.x < to.x ) {
						for( var i = from.x + 1; i < to.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.x + 1; i < from.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						}
					}
				} else {
					if( from.y < to.y ) {
						for( var i = from.y + 1; i < to.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.y + 1; i < from.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					}
				}
				break;

			//马
			case B_HORSE:
			case R_HORSE:
				if( !( Math.abs( from.x - to.x ) == 1 && Math.abs( from.y - to.y ) == 2 || 
					Math.abs( from.x - to.x ) == 2 && Math.abs( from.y - to.y ) == 1 ) ) {
					return false;
				}

				if( to.x - from.x == 2 ) {
					i = from.x + 1;
					j = from.y;
				} else if( from.x - to.x == 2 ) {
					i = from.x - 1;
					j = from.y;
				} else if( to.y - from.y == 2 ) {
					i = from.x;
					j = from.y + 1;
				} else if( from.y - to.y == 2 ) {
					i = from.x;
					j = from.y - 1;
				}

				if( board[ j ][ i ] != NOCHESS ) {
					return false;
				}
				break;

			//炮
			case B_CANON:
			case R_CANON:
				if( from.y != to.y && from.x != to.x ) {
					return false;
				}

				if( target == NOCHESS ) {
					if( from.y == to.y ) {
						if( from.x < to.x ) {
							for( var i = from.x + 1; i < to.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									return false;
								}
							}
						} else {
							for( var i = to.x + 1; i < from.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									return false;
								}
							} 
						}
					} else {
						if( from.y < to.y ) {
							for( var i = from.y + 1; i < to.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									return false;
								}
							}
						} else {
							for( var i = to.y + 1; i < from.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									return false;
								}
							}
						}
					}
				} else {
					var count = 0;

					if( from.y == to.y ) {
						if( from.x < to.x ) {
							for( var i = from.x + 1; i < to.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									count++; 
								}
							}
							if( count != 1 ) {
								return false;
							}
						} else {
							for( var i = to.x + 1; i < from.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									count++;
								}
							}
							if( count != 1 ) {
								return false;
							}
						}
					} else {
						if( from.y < to.y ) {
							for( var i = from.y + 1; i < to.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									count++;
								}
							}  
							if( count != 1 ) {
								return false;
							}
						} else {
							for( var i = to.y + 1; i < from.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									count++;
								}
							}
							if( count != 1 ) {
								return false;
							}
						}
					}
				}
	 	}
	 	return true;
	}

    var GenKingMove = function( board, i, j ) {
    	var from = new ChessPoint( j, i );

    	for( var x = 0 ; x < 3; x++ ) {
    		for( var y = 3; y < 6; y++ ) {
    			var to = new ChessPoint( y, x );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}

    	for( var x = 7; x < 10; x++ ) {
    		for( var y = 3; y < 6; y ++ ) {
    			var  to = new ChessPoint( y, x );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}
    }

    var GenRBishopMove = function( board, i, j ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 7; y < 10; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}
    }

    var GenBBishopMove = function( board, i, j ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 0; y < 3; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}
    }

    var GenElephantMove = function( board, i, j ) {
    	var x;
    	var y;
    	var from;
    	var to;

    	from = new ChessPoint( j, i );

    	x = j + 2;
    	y = i + 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y < 10 && canTouch( board, from, to ) ) {
    		addPoint( to );
    	}

    	x = j + 2;
    	y = i - 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y >=0 && canTouch( board, from, to ) ) {
    		addPoint( to );
    	}

    	x = j - 2;
    	y = i + 2;
    	to = new ChessPoint( x, y );
    	if( x >= 0 && y < 10 && canTouch( board, from, to ) ) {
    		//alert(x+":"+y)
    		addPoint( to );
    	}

    	x = j - 2;
    	y = i - 2;
    	to = new ChessPoint( x, y );
    	if( x >= 0 && y >= 0 && canTouch( board, from, to ) ) {
    		addPoint( to );
    	}
    }

   var GenHorseMove = function( board, i, j ) {
   		var x;
   		var y;
   		var from;
   		var to;
   		from = new ChessPoint( j, i );

   		x = j + 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j + 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}


   		x = j + 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j + 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}   		
   }

   var GenBPawnMove = function( board, i, j ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];

   	   x = j;
   	   y = i + 1;

   	   if( y < 10 ) {
   	   		addPoint( new ChessPoint( x, y ) );
   	   }	

   	   if( i > 4 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}
    	 }
   }

   var GenRPawnMove = function( board, i, j ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];

   	   x = j;
   	   y = i - 1;

   	   if( y >= 0 ) {
   	   		addPoint( new ChessPoint( x, y ) );
   	   }	

   	   if( i < 5 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}
    	 }   		
   }

   var GenCarMove = function( board, i, j ) {
   		var x;
   		var y;
   		var chess = board[ i ][ j ];

   		y = i;
   		x = j + 1;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			x++;
   		}

     	y = i;
   		x = j - 1;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			x--;
   		} 	

      	y = i + 1;
   		x = j;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			y++;
   		} 	

      	y = i - 1;
   		x = j;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			y--;
   		} 	   	
   }

   var GenCanonMove = function( board, i, j ) {
   		var x;
   		var y;
   		var flag;
   		var chess = board[ i ][ j ];

   		x = j + 1;
   		y = i;
   		flag = false;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			x++;
   		}

   		x = j - 1;
   		y = i;
   		flag = false;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			x--;
   		}

   		x = j;
   		y = i + 1;
   		flag = false;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			y++;
   		}   		

   		x = j;
   		y = i - 1;
   		flag = false;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			y--;
   		}    		   		
   }

	var getRelateChess = function( board, i, j ) {
		posCount = 0;
		var chess;
		var x;
		var y;
		
		chess = board[ i ][ j ];

		switch( chess ) {
			case R_KING:
			case B_KING:
			//alert(1)
				GenKingMove( board, i, j );
				break;
			case B_BISHOP:
			//alert(2)
				GenBBishopMove( board, i, j );
				break;
			case R_BISHOP:
			//alert(3)
				GenRBishopMove( board, i, j );
				break;
			case B_BISHOP:
			//alert(4)
				GenBBishopMove( board, i, j );
				break;
			case B_ELEPHANT:
			case R_ELEPHANT:
			//alert(5)
				GenElephantMove( board, i, j );
				break;
			case B_HORSE:
			case R_HORSE:
			//alert(6)
				GenHorseMove( board, i, j );
				break;
			case R_CAR:	
			case B_CAR:
			//alert(7)
				GenCarMove( board, i, j );
				break;
			case B_PAWN:
			//alert(8)
				GenBPawnMove( board, i, j );
				break;
			case R_PAWN:
			//alert(9)
				GenRPawnMove( board, i, j );
				break;
			case B_CANON:
		    case R_CANON:
		   // alert(10)
		    	GenCanonMove( board, i, j );
		    	break;
		    default:
		    	alert( '不存在的棋子' );
		}
	}

	this.eval = function( board, side ) {
		test ++;
				
		var chess;
		var target;

		resetData();

		for( var i = 0; i < 10; i++ ) {
			for( var j = 0; j < 9; j++ ) {
				if( board[ i ][ j ] != NOCHESS ) {
					chess = board[ i ][ j ];
					getRelateChess( board, i, j );

					for( var k = 0; k < posCount; k++ ) {
						target = board[ relatePos[ k ].y ][ relatePos[ k ].x ];
						if( target == NOCHESS ) {
							flexibilityPos[ i ][ j ]++;
						} else {
							if( isSameSide( chess, target ) ) {
								guardPos[ relatePos[ k ].y ][ relatePos[ k ].x ]++;
							} else {
								attackPos[ relatePos[ k ].y ][ relatePos[ k ].x ]++;
								flexibilityPos[ i ][ j ]++; 

								switch( target ) {
									case R_KING:
										if( side == 0 ) {	
											return 18888;
										}
										break;
									case B_KING:
										if( side == 1 ) {
											return -18888;
										}
										break;
									default:
										attackPos[ relatePos[ k ].y ][ relatePos[ k ].x ] += 
											( 30 + ( baseValue[ target ] - baseValue[ chess ] ) / 10 ) / 10;
								}
							}
						}
					}
				}
			}
		}


		for( var i = 0; i < 10; i++ ) {
			for( var j = 0; j < 9; j++ ) {
				if( board[ i ][ j ] != NOCHESS ) {
					chess = board[ i ][ j ];
					chessValue[ i ][ j ]++;
					chessValue[ i ][ j ] += flexValue[ chess ] * flexibilityPos[ i ][ j ];
					chessValue[ i ][ j ] += getPawnValue( j, i, board );
				}
			}
		}

		var halfValue;

		for( var i = 0; i < 10; i++ ) {
			for( var j = 0; j < 9; j++ ) {
				if( board[ i ][ j ] != NOCHESS ) {
					chess = board[ i ][ j ];
					halfValue = baseValue[ chess ] / 16;
					chessValue[ i ][ j ] += baseValue[ chess ];

					if( isRed( chess ) ) {
						if( attackPos[ i ][ j ] ) {
							if( side == 1 ) {
								if( chess == R_KING ) {
									chessValue[ i ][ j ] -= 20;
								} else {
									chessValue[ i ][ j ] -= halfValue * 2;

									if( guardPos[ i ][ j ] ) {
										chessValue[ i ][ j ] += halfValue;
									}
								}
							} else {
								if( chess == R_KING ) {
									return 18888;
								}

								chessValue[ i ][ j ] -= halfValue * 10;

								if( guardPos[ i ][ j ] ) {
									chessValue[ i ][ j ] += halfValue * 9;
								}
							}
							chessValue[ i ][ j ] -= attackPos[ i ][ j ];  
						} else {
							if( guardPos[ i ][ j ] ) {
								chessValue[ i ][ j ] += 5;
							}
						}
					} else {
						if( attackPos[ i ][ j ] ) {
							if( side == 0 ) {
								if( chess == B_KING ) {
									chessValue[ i ][ j ] -= 20;
								} else {
									chessValue[ i ][ j ] -= halfValue * 2;

									if( guardPos[ i ][ j ] ) {
										chessValue[ i ][ j ] += halfValue;
									}									
								}
							} else {
								if( chess == B_KING ) {
									return -18888;
								}

								chessValue[ i ][ j ] -= halfValue * 10;

								if( guardPos[ i ][ j ] ) {
									chessValue[ i ][ j ] += halfValue * 9;
								}								
							}
							chessValue[ i ][ j ] -= attackPos[ i ][ j ];  
						} else {
							if( guardPos[ i ][ j ] ) {
								chessValue[ i ][ j ] += 5;
							}							
						}		
					}
				}
			}
		}

//console.log( flexibilityPos )
//console.log( attackPos )
//console.log( guardPos )
//console.log( chessValue )		

		var redValue = 0;
		var blackValue = 0;

		for( var i = 0; i < 10; i++  ) {
			for( var j = 0; j < 9; j++ ) {
				chess = board[ i ][ j ];
				if( chess != NOCHESS ) {
					if( isRed( chess ) ) {
						redValue += chessValue[ i ][ j ];
						//alert(1)
					} else {
						blackValue += chessValue[ i ][ j ];
						//alert(2)
					}
				}
			}
		}

		//console.log( redValue );
		//console.log( blackValue );
		//console.log( chessValue )
		return blackValue - redValue;
	}

	//初始化
	initialize();
}

var test = 0;

/*//
title:中国象棋搜索引擎类
author:aspwebchh
date:2013/2/12
//*/

var SearchEngine = function( depth ) {
	var moveCreator = new MoveGenerator();
	var evaluation = new Evaluation();
	var maxDepth = depth;
	var bestMove;
	var curBoard;
	var historyTable = new HistoryTable();
	var self = this;

	var makeMove = function( move ) {
		var target;
	    target = curBoard[ move.to.y ][ move.to.x ];
		curBoard[ move.to.y ][ move.to.x ] = curBoard[ move.from.y ][ move.from.x ];
		curBoard[ move.from.y ][ move.from.x ] = NOCHESS;
		return target;
	}
	
	var unMakeMove = function( move, chess ) {
		curBoard[ move.from.y ][ move.from.x ] = curBoard[ move.to.y ][ move.to.x ];
		curBoard[ move.to.y ][ move.to.x ] = chess;
	}
	
	
	this.getGoodMove = function( board ) {
		test = 0;

	    curBoard = board;
	    //var value = maxMin( maxDepth );
		var value = alphaBeta( -20000, 20000, maxDepth );		
		makeMove( bestMove );

		return {
			board: curBoard,
			bestMove: bestMove
		};
	}

	this.isGameOver = function( board ) {
		var redLive = false;
		var blackLive = false;

		for( var i = 7; i < 10; i++ ) {
			for( var j = 3; j < 6; j++ ) {
				if( board[ i ][ j ] == B_KING ) {
					blackLive = true;
				}

				if( board[ i ][ j ] == R_KING ) {
					redLive = true;
				}
			}
		}

		for( var i = 0; i < 3; i++ ) {
			for( var j = 3; j < 6; j++ ) {
				if( board[ i ][ j ] == B_KING ) {
					blackLive = true;
				}

				if( board[ i ][ j ] == R_KING ) {
					redLive = true;
				}				
			}
		}

		if( !redLive ) {
			return 19999;
		}

		if( !blackLive ) {
			return -19999;
		}

		return 0;
	}

	var maxMin = function( depth ) {
		var limit = self.isGameOver( curBoard );
		if( limit ) {
			return limit;
		}

		if( depth <= 0 ) {
			var value = evaluation.eval( curBoard, ( maxDepth ) % 2 );
			return value;
		}

		var moveCount = moveCreator.createPossibleMove( curBoard, depth, ( maxDepth - depth ) % 2 );
		var moveList = moveCreator.getMoveList();
		if( ( maxDepth - depth ) % 2 == 0 ) {
			var current =  -99999;
			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ depth ][ i ] );
				var score = maxMin( depth - 1 );
				unMakeMove( moveList[ depth ][ i ], chess );
			    if( score > current ) {
					current = score;
					if( maxDepth == depth ) {
						bestMove = moveList[ depth ][ i ];
					}
				}						
			}
			return current;
		} else { 
			var current =  99999;
			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ depth ][ i ] );
				var score = maxMin( depth - 1 );
				unMakeMove( moveList[ depth ][ i ], chess );

			    if( score < current ) {
					current = score;
					if( maxDepth == depth ) {
						bestMove = moveList[ depth ][ i ];
					}
				}						
			}
			return current;			
		}
	}

	var alphaBeta = function( alphi, beta, depth ) {
		var limit = self.isGameOver( curBoard );
		if( limit ) {
			return limit;
		}

		if( depth <= 0 ) {
			var value = evaluation.eval( curBoard, maxDepth % 2 );
			return value;
		}

		var bestMoveFlag = -1;

		var moveCount = moveCreator.createPossibleMove( curBoard, depth, ( maxDepth - depth ) % 2 );
		var moveList = moveCreator.getMoveList( depth, moveCount );

		for( var i = 0; i < moveCount; i++ ) {
			moveList[ i ].score = historyTable.getHistoryScore( moveList[ i ] );
		}
		
		if( ( maxDepth - depth ) % 2 == 1 ) {
			moveList.sort( function( a, b ) {
				return b.score - a.score;
			} )

			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ i ] );
				var score = alphaBeta( alphi, beta, depth - 1 );
				unMakeMove( moveList[ i ], chess );

				if( score < beta ) {
					beta = score;

					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}

					bestMoveFlag = i;

					if( alphi >= beta ) {
						bestMoveFlag = i;
						return alphi;
					}
				}
			};

			if( bestMoveFlag != -1 ) {
				historyTable.enterHistoryTable( moveList[ bestMoveFlag ], depth );
			}

			return beta;
		} else {
			moveList.sort( function( a, b ) {
				return b.score - a.score;
			} )

			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ i ] );
				var score = alphaBeta( alphi, beta, depth - 1 );
				unMakeMove( moveList[ i ], chess );
				if( score > alphi ) {
					alphi = score;

					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}

					bestMoveFlag = i;

					if( alphi >= beta ) {
						bestMoveFlag = i;
						return beta;
					}
				}
			};

			if( bestMoveFlag != -1 ) {
				historyTable.enterHistoryTable( moveList[ bestMoveFlag ], depth );
			}

			return alphi;			
		}
	}
}

//历史记录
var HistoryTable = function () {

	var historyTable;

	var initialize = function() {
		//初始化历史记录表
		historyTable = [];
		for (var i = 0; i < 90; i++) {
			historyTable.push( [] );
			for (var j = 0; j < 90; j++) {
				historyTable[ i ][ j ] = 0;
			};
		}
	}

	this.enterHistoryTable = function( move, depth ) {
		var from = move.from.y * 9 + move.from.x;
		var to = move.to.y * 9 + move.to.x;
		historyTable[ from ][ to ] += 2 << depth;		
	}

	this.getHistoryScore = function( move ) {
		var from = move.from.y * 9 + move.from.x;
		var to = move.to.y * 9 + move.to.x;
		return historyTable[ from ][ to ];
	}

	initialize();	
}
