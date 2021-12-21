import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

export default class InElementController extends Controller {
  @tracked elsewhere;

  registerElsewhere = modifier((element) => {
    this.elsewhere = element;
  });
}
