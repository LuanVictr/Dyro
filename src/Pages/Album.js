import React from 'react';

class Album extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <p data-testid="page-album">
        Página de album id:
        { id }
      </p>
    );
  }
}

export default Album;
