window.__require=function t(i,n,e){function o(c,r){if(!n[c]){if(!i[c]){var h=c.split("/");if(h=h[h.length-1],!i[h]){var a="function"==typeof __require&&__require;if(!r&&a)return a(h,!0);if(s)return s(h,!0);throw new Error("Cannot find module '"+c+"'")}c=h}var u=n[c]={exports:{}};i[c][0].call(u.exports,function(t){return o(i[c][1][t]||t)},u,u.exports,t,i,n,e)}return n[c].exports}for(var s="function"==typeof __require&&__require,c=0;c<e.length;c++)o(e[c]);return o}({Block:[function(t,i,n){"use strict";cc._RF.push(i,"49d07iyMkBGy7Jp2GAUpcpG","Block"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],Box:[function(t,i,n){"use strict";cc._RF.push(i,"252c5mewv1FT5Mao2QPkKmx","Box"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.systemEvent.on("TransferBoxes",this.checkTransfer,this)},start:function(){},update:function(t){this.updateCheck&&!this._transfering&&this.node.getBoundingBox().intersects(this.inBounding)&&this.transfer()},checkTransfer:function(t){this.inPosition=t.inPosition,this.inBounding=t.inBoundingBox,this.inNormal=t.inNormal,this.outPosition=t.outPosition,this.outBounding=t.outBoundingBox,this.outNormal=t.outNormal,this.updateCheck=!0},transfer:function(){this._transfering=!0;var t=cc.v2(this.inPosition.x-30*this.inNormal.x,this.inPosition.y-30*this.inNormal.y),i=cc.sequence(cc.callFunc(function(){this.node.getComponent(cc.PhysicsBoxCollider).enabled=!1,this.node.getComponent(cc.BoxCollider).enabled=!1},this),cc.moveTo(.2,t),cc.callFunc(function(){this.node.opacity=0;var t=this.node.parent.convertToNodeSpaceAR(this.outPosition);this.node.position=t,this.node.getComponent(cc.PhysicsBoxCollider).enabled=!0,this.node.getComponent(cc.BoxCollider).enabled=!0,this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0)},this),cc.delayTime(.1),cc.callFunc(function(){this.node.opacity=255,this._transfering=!1},this));this.node.runAction(i)}}),cc._RF.pop()},{}],Charactor:[function(t,i,n){"use strict";cc._RF.push(i,"5df30UjkF1AhInDoxN5tM/0","Charactor"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],Line:[function(t,i,n){"use strict";cc._RF.push(i,"d5e3aE6VPJE5Icx4BLWxaIR","Line"),window.LineType=cc.Enum({In:0,Out:1,End:2}),cc.Class({extends:cc.Component,properties:{spLineDot:{default:[],type:[cc.SpriteFrame]},spLineEnd:{default:[],type:[cc.SpriteFrame]},lineType:{default:LineType.In,type:LineType},ndDot:{default:null,type:cc.Node},spEnd:{default:null,type:cc.Sprite}},onLoad:function(){this.dotPool=new cc.NodePool(cc.Node);for(var t=0;t<15;++t){var i=new cc.Node("dot");i.addComponent(cc.Sprite).spriteFrame=this.spLineDot[this.lineType],this.dotPool.put(i)}this.usedDot=[],this.normalVec=cc.v2(0,1)},start:function(){this.spEnd.spriteFrame=this.spLineEnd[this.lineType],this.updateLine()},init:function(t,i,n){this.lineType=t,this.startPosition=i,this.node.position=this.startPosition,this.endPosition=n},updateLine:function(t,i){if(this.endPosition){t&&(this.lineType=t),i&&(this.endPosition=i);var n=this.endPosition.sub(cc.v2(this.node.position)),e=n.normalize(),o=(this.node.position.x-this.endPosition.x)/Math.abs(this.endPosition.x-this.node.position.x);this.newAngle=o*Math.acos(this.normalVec.dot(e))*180/Math.PI,this.node.angle=this.newAngle,this.spEnd.spriteFrame=this.spLineEnd[this.lineType],this.spEnd.node.position=this.node.convertToNodeSpaceAR(this.endPosition);var s=n.mag(),c=this.spLineDot[this.lineType].getOriginalSize().height,r=Math.min(Math.floor(s/c),100);if(this.usedDot.length<r){for(var h=0;h<this.usedDot.length;++h){(p=this.usedDot[h]).getComponent(cc.Sprite).spriteFrame=this.spLineDot[this.lineType]}for(;this.usedDot.length<r;){if(!(p=this.dotPool.get()))p=new cc.Node,(p=new cc.Node("dot")).addComponent(cc.Sprite);p.getComponent(cc.Sprite).spriteFrame=this.spLineDot[this.lineType],p.parent=this.ndDot,this.usedDot.push(p)}}else{var a=this.usedDot.length;for(h=0;h<a-r;++h){var u=this.usedDot.pop();u&&this.dotPool.put(u)}for(h=0;h<r;++h){var p;(p=this.usedDot[h]).getComponent(cc.Sprite).spriteFrame=this.spLineDot[this.lineType]}}}},getEndPosition:function(){return this.endPosition}}),cc._RF.pop()},{}],Star:[function(t,i,n){"use strict";cc._RF.push(i,"9735e94/59K1psSlhGYnNUu","Star"),cc.Class({extends:cc.Component,properties:{},start:function(){},onCollisionEnter:function(t){t.getComponent("Box")&&(this.node.active=!1)}}),cc._RF.pop()},{}],Target:[function(t,i,n){"use strict";cc._RF.push(i,"74105auIEtOHKKXIzXEaUo0","Target"),cc.Class({extends:cc.Component,properties:{},start:function(){},onCollisionEnter:function(t){t.getComponent("Box")&&cc.systemEvent.emit("TargetCollision")}}),cc._RF.pop()},{}],game:[function(t,i,n){"use strict";cc._RF.push(i,"5fd74OkjtZNCqLWKpjHV0rF","game"),cc.Class({extends:cc.Component,properties:{pfLine:{default:null,type:cc.Prefab},ndShooting:{default:null,type:cc.Node},ndPort:{default:null,type:cc.Node},spChuansong:{default:null,type:cc.SpriteFrame},curLevel:{default:0,type:cc.Integer},ndNext:{default:null,type:cc.Node}},onLoad:function(){cc.director.getCollisionManager().enabled=!0,cc.director.getPhysicsManager().enabled=!0,this.node.on("touchstart",this.onTouchBegin,this),this.node.on("touchmove",this.onTouchMove,this),this.node.on("touchend",this.onTouchEnd,this),cc.systemEvent.on("TargetCollision",this.onTargetCollision,this)},start:function(){this.curLineType=LineType.In,this.ptShooting=cc.v2(this.ndShooting.parent.convertToWorldSpaceAR(this.ndShooting.position)),this.hasTouch=!1,this.curLine=null},onTouchBegin:function(t){if(this.curLineType!=LineType.End){this.hasTouch=!0;var i=this.checkTouch(t,this.ptShooting);if(this.curLine){this.curLine.getComponent("Line").updateLine(this.curLineType,i),this.curLine.active=!0}else{var n=cc.instantiate(this.pfLine);n.getComponent("Line").init(this.curLineType,this.ptShooting,i),this.node.parent.addChild(n),this.curLine=n}}},onTouchMove:function(t){if(this.curLineType!=LineType.End&&this.hasTouch){var i=this.checkTouch(t,this.ptShooting),n=this.curLine.getComponent("Line");n&&n.updateLine(this.curLineType,i)}},onTouchEnd:function(t){if(this.curLineType!=LineType.End){this.hasTouch=!1;var i=this.curLine.getComponent("Line");if(i){var n=i.getEndPosition();this.node.getBoundingBox().contains(n)?(this.curLineType==LineType.In?(this.inPosition=n,this.inPort=this.createPort(n,this.inNormal)):(this.outPosition=n,this.outPort=this.createPort(n,this.outNormal)),this.curLine.active=!1,this.curLineType=this.curLineType==LineType.In?LineType.Out:LineType.End,this.curLineType==LineType.End&&this.transferBox()):this.curLine.active=!1}}},checkTouch:function(t,i){for(var n=t.getLocation(),e=n.sub(cc.v2(i)),o=n.add(e.multiplyScalar(10)),s=cc.director.getPhysicsManager().rayCast(i,o,cc.RayCastType.AllClosest),c=o,r=0;r<s.length;++r){var h=s[r],a=h.collider;if(a.getComponent("Block")){c=h.point,this.curLineType==LineType.In?(this.inNormal=h.normal,this.inCollider=a):(this.outNormal=h.normal,this.outCollider=a);break}}return c},createPort:function(t,i){var n=new cc.Node;n.addComponent(cc.Sprite).spriteFrame=this.spChuansong;var e=cc.v2(0,1),o=180*Math.asin(e.cross(i))/Math.PI;return n.angle=o,n.position=t,n.parent=this.ndPort,n},transferBox:function(){var t=this.inPort.getBoundingBox(),i=this.outPort.getBoundingBox();cc.systemEvent.emit("TransferBoxes",{inPosition:this.inPosition,inBoundingBox:t,inNormal:this.inNormal,outPosition:this.outPosition,outBoundingBox:i,outNormal:this.outNormal});this.scheduleOnce(this.retry,7)},retry:function(){cc.director.loadScene("Level"+this.curLevel)},onTargetCollision:function(){this.unschedule(this.retry),this.ndNext.active=!0},nextLevel:function(){cc.director.loadScene("Level"+(this.curLevel+1))}}),cc._RF.pop()},{}]},{},["Block","Box","Charactor","Line","Star","Target","game"]);