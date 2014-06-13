
module.exports = function(game, opts) {
  return new HealthFallPlugin(game, opts);
};

function HealthFallPlugin(game, opts) {
  this.game = game;

  this.blocksPerUnitDamage = opts.blocksPerUnitDamage || 4;
  this.damageMultiplier = opts.damageMultiplier || 1;

  this.health = game.plugins.get('voxel-health');
  if (!this.health) throw new Error('voxel-health-falling requires voxel-health');

  this.enable();
}

HealthFallPlugin.prototype.enable = function() {
  var self = this;

  this.game.controls().target.fell = function(dy) { // TODO: change voxel-physical to EventEmitter?
    if (dy >= self.blocksPerUnitDamage) {
      var damage = Math.ceil(dy / self.blocksPerUnitDamage) * self.damageMultiplier;

      self.health.hurt(damage);
    }
  };
};

HealthFallPlugin.prototype.disable = function() {
  this.game.controls().target.fell = undefined; // TODO: event instead?
};

