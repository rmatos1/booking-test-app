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
  BedroomPic,
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
                <ListItem key={item.number}>
                  <ContainerPic>
                    <BedroomPic
                      src={item.img}
                      alt={`bedroom${item.number} pic`}
                    />
                  </ContainerPic>

                  <Description>
                    <BedroomName>Bedroom {item.number}</BedroomName>

                    <ul>
                      <li>{item.type} bedroom</li>
                      {item.beds.double &&
                        bedsListItem(item.beds.double, 'double')}
                      {item.beds.single &&
                        bedsListItem(item.beds.single, 'single')}
                    </ul>
                  </Description>

                  <PriceGroup>
                    <span>{results.numberOfNights} nights</span>

                    <PriceText>
                      $ {item.dailyPrice * results.numberOfNights}
                    </PriceText>

                    <Button
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
            <ImgContainer>
              <Image src={svg.emptyResults} alt="no results image" />

              <p>We didn't find available bedrooms with this search criteria</p>
            </ImgContainer>
          )}
        </ListContainer>
      </TwoColumnsGrid>

      {isDrawerVisible && <ConfirmYourBookingDrawer />}
    </>
  );
};
