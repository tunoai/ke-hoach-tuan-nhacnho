import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 40, textAlign: 'center', fontFamily: 'Inter, sans-serif',
          color: '#e11d48', background: '#1a1a2e', minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <h2 style={{ marginBottom: 12 }}>⚠️ Đã xảy ra lỗi</h2>
          <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 16 }}>
            {this.state.error?.message || 'Lỗi không xác định'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px', background: '#6366f1', color: '#fff',
              border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer'
            }}
          >
            Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
