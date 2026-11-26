import { Component } from 'react';

/** Keeps a rendering error from blanking the whole book. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <article className="help-page" role="alert">
        <h1>화면을 표시하지 못했습니다</h1>
        <p>이 쪽을 그리는 중에 문제가 생겼습니다. 학습 기록은 그대로 남아 있습니다.</p>
        <p><button type="button" className="button" onClick={() => this.setState({ failed: false })}>다시 시도</button> <a href="#/" onClick={() => this.setState({ failed: false })}>차례로 돌아가기</a></p>
      </article>
    );
  }
}
