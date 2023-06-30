import Component from '@glimmer/component';
import ENV from 'super-rentals/config/environment';

const PICSUM_URL = 'https://picsum.photos';

export default class MapComponent extends Component {
  get src() {
    let { id, width, height } = this.args;
    let dimensions = `${width}/${height}`;
    let accessToken = `dummy=${this.token}`;
    return `${PICSUM_URL}/id/${id}/${dimensions}?${accessToken}`;
  }

  get token() {
    return encodeURIComponent(ENV.DUMMY_ACCESS_TOKEN);
  }
}
