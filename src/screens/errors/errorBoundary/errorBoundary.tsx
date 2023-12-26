import { Component, ReactNode } from 'react';
import { svg } from '../../../assets';
import {
  CenteredContentWrapper,
  Image,
  PageTitle,
  TextWrapper,
} from '../../../components';
import { ScreenPaths } from '../../../types';
import styled from 'styled-components';

export interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

const StyledLink = styled.a`
  text-decoration: none;
  color: #1395ec;
`

/**
 * page showed whenever there's an error on the app
 */
export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(error: any) {
    console.log(error);

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <CenteredContentWrapper>
          <Image imgSrc={svg.errorApp} alt="Error app" />

          <TextWrapper $maxWidth={400}>
            <PageTitle>We got an error!</PageTitle>

            <p>
              Sorry, we got a momentary malfunctioning.{"\n"}Click on the link below
              to refresh the page
            </p>

            <StyledLink href={ScreenPaths.home}>New Booking</StyledLink>
            
          </TextWrapper>
        </CenteredContentWrapper>
      );
    }
    return this.props.children;
  }
}
