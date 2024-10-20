import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@common/components/ui/select"
import PropTypes from 'prop-types'
import React from 'react'

function SelectComponent(props) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="dark1">Dark</SelectItem>
                <SelectItem value="dark2">Dark</SelectItem>
                <SelectItem value="dark3">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>

    )
}

SelectComponent.propTypes = {}

export default SelectComponent
