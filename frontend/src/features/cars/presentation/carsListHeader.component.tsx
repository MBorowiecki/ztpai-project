import { Button } from 'core/buttons/presentation';
import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  filteringOption: string;
  setFilteringOption: (option: string) => void;
}

export const CarsListHeader = ({ filteringOption, setFilteringOption }: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="col-12 mb-2">
      <div className="row row-vcenter mb-2">
        <div className="col col-7">
          <h2 className="size-xxl weight-bold color-primary_3">Cars</h2>
        </div>
        <div className="col col-5">
          <div className="row row-hcenter">
            <div className="col col-8">
              <div className="row row-vcenter ph-2">
                <div className="col mr-1">
                  <p className="size-l color-light_2">Filter by</p>
                </div>
                <div className="col col-grow">
                  <select
                    className="input input--select color-light_2"
                    value={filteringOption}
                    onChange={(e) => setFilteringOption(e.target.value)}>
                    <option value="all">All</option>
                    <option value="in_production">In production</option>
                    <option value="not_in_production">Not in production</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col col-4">
              <div className="pl-2 full-height">
                <Button
                  type="primary"
                  className="full-height full-width size-l weight-bold"
                  onClick={() => navigate('/cars/new')}>
                  NEW CAR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};
