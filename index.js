
module.exports = function(game, opts) {
  return new HealthFallingPlugin(game, opts);
};

function HealthFallingPlugin(game, opts) {
  this.player = game.plugins.get('voxel-player');
  if (!this.player) throw new Error('voxel-health-falling requires voxel-player');

  this.health = game.plugins.get('voxel-health');
  if (!this.health) throw new Error('voxel-health-falling requires voxel-health');

  this.enable();
}

HealthFallingPlugin.prototype.enable = function() {
  var self = this;

  this.player.fell = function(dy) { // TODO: change voxel-physical to EventEmitter?
    if (dy > 4) {
      var damage = Math.ceil(dy / 4);

      self.health.hurt(damage);
    }
  };
};

HealthFallingPlugin.prototype.disable = function() {
  this.player.fell = undefined;
};

