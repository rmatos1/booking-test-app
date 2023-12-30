import { svg } from '../../assets';
import {
  BookingForm,
  Button,
  Image,
  ImgContainer,
  ListContainer,
  ListItem,
  NavBar,
  TwoColumnsGrid,
} from '../../components';
import { ConfirmYourBookingDrawer } from '../../drawers';
import {
  BedroomName,
  ContainerPic,
  Description,
  PriceGroup,
  PriceText,
} from './resultsList.styles';
import { useResultsListHelper } from './resultsListHelper.hook';

/**
 * page that shows the available bedrooms according to the search criteria
 */
export const ResultsList = () => {
  const { onBookingClick, isDrawerVisible, results } = useResultsListHelper();

  /**
   * adds a "s" if there is more than one bed in the bedroom
   */
  const bedsListItem = (beds: number, typeOfBed: string) => {
    return (
      <li>
        {beds} {typeOfBed} bed{beds > 1 ? 's' : ''}
      </li>
    );
  };

  return (
    <>
      <NavBar />

      <TwoColumnsGrid>
        <BookingForm />

        <ListContainer>
          {results.bedrooms.length ? (
            <>
              {results.bedrooms.map((item) => (
                <ListItem key={item.number} data-testid="bedroom-info">
                  <ContainerPic>
                    <Image
                      height="100%"
                      data-testid="bedroom-pic"
                      imgSrc={item.img}
                      alt={`bedroom${item.number} pic`}
                    />
                  </ContainerPic>

                  <Description>
                    <BedroomName data-testid="bedroom-name">
                      Bedroom {item.number}
                    </BedroomName>

                    <ul data-testid="bedroom-details">
                      <li>{item.type} bedroom</li>
                      {item.beds.double &&
                        bedsListItem(item.beds.double, 'double')}
                      {item.beds.single &&
                        bedsListItem(item.beds.single, 'single')}
                    </ul>
                  </Description>

                  <PriceGroup>
                    <span>{results.numberOfNights} nights</span>

                    <PriceText data-testid="bedroom-total-price">
                      $ {item.dailyPrice * results.numberOfNights}
                    </PriceText>

                    <Button
                      data-testid="book-now"
                      $height={40}
                      $fontSize={14}
                      $backgroundColor="rgb(245, 172, 36)"
                      onClick={() => onBookingClick(item.number)}
                    >
                      Book Now
                    </Button>
                  </PriceGroup>
                </ListItem>
              ))}
            </>
          ) : (
            <ImgContainer data-testid="no-results-content">
              <Image imgSrc={svg.emptyResults} alt="no results image" />

              <p>We didn't find available bedrooms with this search criteria</p>
            </ImgContainer>
          )}
        </ListContainer>
      </TwoColumnsGrid>

      {isDrawerVisible && <ConfirmYourBookingDrawer />}
    </>
  );
};
