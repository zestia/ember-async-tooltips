import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

export default class ReferenceController extends Controller {
  @tracked span;

  registerSpan = modifier((element) => {
    this.span = element;
  });
}
