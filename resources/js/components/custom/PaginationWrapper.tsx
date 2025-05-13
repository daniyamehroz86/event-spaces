import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'; // adjust path as needed
import React from 'react';

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links: PaginationLinkType[];
    className?: string;
}

const PaginationWrapper: React.FC<Props> = ({ links, className }) => {
    if (!links || links.length <= 3) return null;

    return (
        <Pagination className={className}>
            <PaginationContent>
                {links.map((link, index) => {
                    if (link.label.includes('Previous')) {
                        return link.url ? (
                            <PaginationItem key={index}>
                                <PaginationPrevious href={link.url} />
                            </PaginationItem>
                        ) : null;
                    }

                    if (link.label.includes('Next')) {
                        return link.url ? (
                            <PaginationItem key={index}>
                                <PaginationNext href={link.url} />
                            </PaginationItem>
                        ) : null;
                    }

                    if (link.label === '...') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink href={link.url || '#'} isActive={link.active}>
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationWrapper;
