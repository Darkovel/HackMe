import React from 'react';
import {
  HamburgerMenuIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

function Content({ children, ...props }) {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content {...props}>
          {children}
          <DropdownMenuPrimitive.Arrow />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }

  function SubContent(props) {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.SubContent {...props} />
      </DropdownMenuPrimitive.Portal>
    );
  }
  
  const itemStyles = {
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    color: 'purple',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 5px',
    position: 'relative',
    paddingLeft: 25,
    userSelect: 'none',
  
    '&[data-disabled]': {
      color: 'purple',
      pointerEvents: 'none',
    },
  
    '&[data-highlighted]': {
      backgroundColor: 'purple',
      color: 'purple',
    },
  };
  
  

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = Content;
export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;
export const DropdownMenuSubContent = SubContent;

// Your app...

function DropDownOptions() {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState('pedro');


    return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-12 h-12 rounded-full bg-blue-500" aria-label="Customise options">
                </div>
              </DropdownMenuTrigger>
      
              <DropdownMenuContent className="bg-white rounded-1/2" sideOffset={5}>
                <DropdownMenuItem>
                  Info
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Assign Desk To...
                    <div className='pl-5 ml-auto'>
                      <ChevronRightIcon />
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                    <DropdownMenuItem>Verdelet</DropdownMenuItem>
                    <DropdownMenuItem>David</DropdownMenuItem>
                    <DropdownMenuItem>Emma</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      }

export default DropDownOptions;